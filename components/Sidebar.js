// Objetivo: Componente Sidebar que muestra el logo y las categorías de la aplicación

import Image from 'next/image';
import useQuiosco from '@/hooks/useQuiosco';
import { Categoria } from './Categoria';

const Sidebar = () => {
  // Obtenemos las categorías del hook useQuiosco
  const { categorias } = useQuiosco();

  return (
    <>
      <Image
        width={150}
        height={100}
        src='/assets/img/logo.svg'
        alt='imagen logotipo'
        className='mx-auto mt-10'
      />

      <nav className='mt-5'>
        {categorias.map(categoria => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
