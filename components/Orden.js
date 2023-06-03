// Componente para mostrar una orden

import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { formatearDinero } from '@/helpers';

const Orden = ({ orden }) => {
  // Destructuramos la orden para obtener el id, el nombre, el total y el pedido
  const { id, nombre, total, pedido } = orden;

  // Función para completar una orden
  const completarOrden = async () => {
    try {
      await axios.post(`/api/ordenes/${id}`);
      toast.success('Orden Completada');
    } catch (error) {
      toast.error('Hubo un error al completar la orden');
    }
  };

  return (
    <div className='border p-10 space-y-5'>
      <h3 className='text-2xl font-bold'>Orden: {id}</h3>
      <p className='text-lg font-bold'>Cliente: {nombre}</p>

      <div>
        {pedido.map(platillo => (
          <div
            key={platillo.id}
            className='py-3 flex border-b last-of-type:border-0 items-center'
          >
            <Image
              src={`/assets/img/${platillo.imagen}.jpg`}
              width={100}
              height={100}
              alt={`img platillo ${platillo.nombre}`}
            />

            <div className='p-5 space-y-2'>
              <h4 className='text-xl font-bold text-amber-500'>
                {platillo.nombre}
              </h4>
              <p className='text-lg font-bold'>Cantidad: {platillo.cantidad}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='md:flex md:items-center md:justify-between my-10'>
        <p className='mt-5 font-black text-2xl text-amber-500 '>
          Total a pagar: {formatearDinero(total)}
        </p>

        <button
          className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold text-lg uppercase rounded transition-colors duration-300 ease-in-out shadow-lg hover:shadow-xl w-full md:w-auto'
          type='button'
          onClick={completarOrden}
        >
          Completar Orden
        </button>
      </div>
    </div>
  );
};

export default Orden;
