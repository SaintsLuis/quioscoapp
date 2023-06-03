// Objetivo: Componente que representa una categoría de productos

import Image from 'next/image';
import useQuiosco from '@/hooks/useQuiosco';

// Definimos el componente Categoria que representa una categoría de productos
export const Categoria = ({ categoria }) => {
  // Utilizamos el hook useQuiosco para acceder al estado y las funciones proporcionadas por QuioscoProvider
  const { categoriaActual, handleClickCategoria } = useQuiosco();

  // Destructuramos la categoría para obtener el nombre, el icono y el id
  const { nombre, icono, id } = categoria;

  return (
    <div
      className={`${
        categoriaActual?.id === id ? 'bg-amber-400' : ''
      } flex items-center gap-8 w-full border p-3 hover:bg-amber-400`}
    >
      <Image
        src={`/assets/img/icono_${icono}.svg`}
        width={53}
        height={53}
        alt='Imagen Icono'
      />

      <button
        type='button'
        className='text-2xl text font-bold hover:cursor-pointer'
        onClick={() => handleClickCategoria(id)}
      >
        {nombre}
      </button>
    </div>
  );
};
