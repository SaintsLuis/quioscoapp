// Objetivo: Componente que muestra un producto en la página de inicio

import Image from 'next/image';
import { formatearDinero } from '@/helpers';
import useQuiosco from '@/hooks/useQuiosco';

const Producto = ({ producto }) => {
  // Extraemos los métodos y el estado de useQuiosco
  const { handleSetProducto, handleChangeModal } = useQuiosco();

  // Extraemos las propiedades del producto
  const { nombre, precio, imagen } = producto;

  return (
    <div className='border p-3'>
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen Platillo ${nombre}`}
        width={250}
        height={150}
      />
      <div className='p-5'>
        <h3 className='text-2xl font-bold'>{nombre}</h3>
        <p className='mt-5 font-black text-3xl text-amber-500'>
          {formatearDinero(precio)}
        </p>

        <button
          type='button'
          className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold text-lg uppercase rounded transition-colors duration-300 ease-in-out shadow-lg hover:shadow-xl w-full'
          onClick={() => {
            handleChangeModal();
            handleSetProducto(producto);
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Producto;
