// Objetivo: Proveer los valores y funciones del contexto a los componentes hijos

import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ConfirmDialogAlert } from '@/components/SweetAlert';
import { useRouter } from 'next/router';

// Crear el contexto
const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  // Definir los state del context
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState('');
  const [total, setTotal] = useState(0);

  const router = useRouter();

  // Obtener categorías desde la API
  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias');
    setCategorias(data);
  };

  // Obtener categorías al cargar la página
  useEffect(() => {
    obtenerCategorias();
  }, []);

  // Establecer la primera categoría como la categoría actual
  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  // Calcular el total del pedido al cargar el pedido
  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0,
    );

    setTotal(nuevoTotal);
  }, [pedido]);

  // Manejar el click en una categoría de la barra lateral
  const handleClickCategoria = id => {
    const categoria = categorias.filter(cat => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push('/');
  };

  // Establecer el producto actual
  const handleSetProducto = producto => {
    setProducto(producto);
  };

  // Cambiar el estado del modal
  const handleChangeModal = () => {
    setModal(!modal);
  };

  // Agregar un producto al pedido o actualizar la cantidad si ya está en el pedido
  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some(p => p.id === producto.id)) {
      // Actualizar la cantidad si el producto ya está en el pedido
      const pedidoActualizado = pedido.map(p =>
        p.id === producto.id ? producto : p,
      );
      setPedido(pedidoActualizado);
      toast.success('Guardado correctamente');
    } else {
      // Agregar el producto al pedido si no está en el pedido
      setPedido([...pedido, producto]);
      toast.success(`${producto.nombre} agregado al pedido`);
    }

    // Cerrar el modal
    setModal(false);
  };

  // Manejar la edición de las cantidades de un producto en el pedido desde el modal
  const handleEditarCantidades = id => {
    const productoActualizar = pedido.filter(producto => producto.id === id);
    setProducto(productoActualizar[0]);

    setModal(!modal);
  };

  // Eliminar un producto del pedido
  const handleEliminarProducto = (id, productoEliminar) => {
    // Mostrar una alerta de confirmación SweetAlert
    ConfirmDialogAlert({
      title: 'Eliminar Producto',
      text: `¿Estás seguro de eliminar ${productoEliminar.nombre} de tu orden?`,
      onConfirm: () => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id);
        setPedido(pedidoActualizado);
      },
    });
  };

  // Colocar la orden en la BD
  const colocarOrden = async e => {
    e.preventDefault();

    try {
      // Hacer una solicitud POST a la API para colocar la orden
      await axios.post('/api/ordenes', {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      // Resetear los valores de la aplicación y redireccionar
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre('');
      setTotal(0);

      toast.success('Orden Colocada Correctamente');

      setTimeout(() => {
        // Redireccionar a la página de inicio después de 3 segundos
        router.push('/');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  // Proporcionar los valores y funciones del contexto a los componentes hijos
  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
