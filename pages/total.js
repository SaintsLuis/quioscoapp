import { useEffect, useCallback } from 'react';
import Layout from '@/layout/Layout';
import useQuiosco from '@/hooks/useQuiosco';
import { formatearDinero } from '@/helpers';

// Definimos el componente Total que representa la página de total
export default function Total() {
  // Obtenemos desde el hook useQuiosco
  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

  // Definimos la función comprobarPedido utilizando useCallback para memorizarla
  const comprobarPedido = useCallback(() => {
    // Comprobamos si el pedido está vacío, si el nombre está vacío o si el nombre tiene menos de 3 caracteres
    return pedido.length === 0 || nombre === '' || nombre.length < 3;
  }, [pedido, nombre]);

  // Utilizamos useEffect para ejecutar la función comprobarPedido cuando cambien el pedido o comprobarPedido
  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    // Utilizamos el componente Layout para establecer la estructura de la página
    <Layout pagina='Total y Confirmar Pedido'>
      <h1 className='text-3xl font-black'>Total y Confirmar Pedido</h1>
      <p className='text-2xl my-6'>Confirma tu Pedido a Continuación</p>

      <form onSubmit={colocarOrden}>
        <div>
          <label
            htmlFor='nombre'
            className='block uppercase text-slate-800 font-bold text-xl'
          >
            Nombre
          </label>
          <input
            id='nombre'
            type='text'
            className='bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md'
            value={nombre}
            placeholder='Nombre del Cliente'
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className='mt-10'>
          <p className='text-2xl'>
            Total a pagar: {''}{' '}
            <span className='font-bold'>{formatearDinero(total)}</span>
          </p>
        </div>

        <div className='mt-5'>
          <input
            type='submit'
            value='Confirmar Pedido'
            className={` ${
              comprobarPedido()
                ? 'bg-indigo-100 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-800 hover:shadow-md cursor-pointer transition-colors duration-300 ease-in-out'
            } w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}
