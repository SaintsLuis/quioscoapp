// Objetivo: Componente ModalProducto que representa el modal de un producto

import { useState, useEffect } from 'react';
import Image from 'next/image';
import useQuiosco from '@/hooks/useQuiosco';
import { formatearDinero } from '@/helpers';

// Definimos el componente ModalProducto que representa el modal de un producto
const ModalProducto = () => {
  // Extraemos datos y funciones desde useQuiosco custom hook
  const { producto, handleChangeModal, handleAgregarPedido, pedido } =
    useQuiosco();

  // Estado local para la cantidad y la edición del producto en el pedido
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  useEffect(() => {
    // Comprobar si el Modal actual está en el pedido
    if (pedido.some(p => p.id === producto.id)) {
      // Encontrar el producto en el pedido para obtener la cantidad
      const productoEdicion = pedido.find(p => p.id === producto.id);

      setEdicion(true);
      setCantidad(productoEdicion.cantidad);
    }
  }, [producto, pedido]);

  return (
    <div className='md:flex gap-10'>
      <div className='md:w-1/3'>
        <Image
          width={300}
          height={400}
          alt={`imagen producto ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
        />
      </div>

      <div className='md:w-2/3'>
        <div className='flex justify-end'>
          <button onClick={handleChangeModal}>
            {/* Icono de cerrar */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <h1 className='text-3xl font-bold mt-5'>{producto.nombre}</h1>
        <p className='mt-5 font-black text-5xl text-amber-500'>
          {formatearDinero(producto.precio)}
        </p>

        <div className='flex gap-4 mt-5'>
          {/* Botón de disminuir cantidad */}
          <button
            type='button'
            onClick={() => {
              if (cantidad <= 1) return;
              setCantidad(cantidad - 1);
            }}
          >
            {/* Icono de disminuir */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-7 h-7'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </button>

          <span className='text-3xl'>{cantidad}</span>

          {/* Botón de aumentar cantidad */}
          <button
            type='button'
            onClick={() => {
              if (cantidad >= 10) return;
              setCantidad(cantidad + 1);
            }}
          >
            {/* Icono de aumentar */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-7 h-7'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </button>
        </div>

        {/* Botón para agregar producto al pedido */}
        <button
          type='button'
          className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded transition-colors duration-300 ease-in-out shadow-lg hover:shadow-xl'
          onClick={() => {
            handleAgregarPedido({ ...producto, cantidad });
          }}
        >
          {/* Texto del botón dependiendo si es edición o agregar al pedido */}
          {edicion ? 'Guardar Cambios' : 'Agregar al Pedido'}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
