// Objetivo: Componente que muestra la información de un producto en el resumen de la compra

import Image from 'next/image';
import { formatearDinero } from '@/helpers';
import useQuiosco from '@/hooks/useQuiosco';

const ResumenProducto = ({ producto }) => {
  // Extraemos los métodos del hook useQuiosco
  const { handleEditarCantidades, handleEliminarProducto } = useQuiosco();

  return (
    <div className='shadow p-5 mb-3 flex gap-10 items-center'>
      <div className='md:w-1/6'>
        <Image
          width={300}
          height={400}
          alt={`Imagen producto ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
        />
      </div>

      <div className='md:w-4/6'>
        <p className='text-3xl font-bold'>{producto.nombre}</p>
        <p className='text-xl font-bold mt-2'>Cantidad: {producto.cantidad}</p>
        <p className='text-xl font-bold text-amber-500 mt-2'>
          Precio: {formatearDinero(producto.precio)}
        </p>

        <p className='text-sm text-gray-700 mt-2'>
          Subtotal: {formatearDinero(producto.precio * producto.cantidad)}
        </p>
      </div>

      <div>
        <button
          type='button'
          className='bg-sky-700 flex gap-1 px-5 py-2 text-white rounded-md text-center font-bold uppercase shadow-md w-full'
          onClick={() => handleEditarCantidades(producto.id)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6'
          >
            {/* Icono de editar */}
          </svg>
          Editar
        </button>

        <button
          type='button'
          className='bg-red-700 flex gap-1 px-5 py-2 text-white rounded-md text-center font-bold uppercase shadow-md w-full mt-4'
          onClick={() => handleEliminarProducto(producto.id, producto)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6'
          >
            {/* Icono de eliminar */}
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ResumenProducto;
