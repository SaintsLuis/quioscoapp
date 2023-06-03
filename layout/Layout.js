import Head from 'next/head';
import Sidebar from '@/components/Sidebar';
import ModalProducto from '@/components/ModalProducto';
import Pasos from '@/components/Pasos';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import useQuiosco from '@/hooks/useQuiosco';

import 'react-toastify/dist/ReactToastify.css';

// Establecemos los estilos del modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Establecemos el elemento raíz del modal
Modal.setAppElement('#__next');

// Definimos el componente Layout que representa la estructura de la aplicación
export default function Layout({ children, pagina }) {
  // Utilizamos modal desde el contexto QuioscoContext
  const { modal } = useQuiosco();

  return (
    <>
      {/* Utilizamos el componente Head para establecer el título y la descripción de la página */}
      <Head>
        <title>Café - {pagina}</title>
        <meta name='description' content='Quiosco Cafetería' />
      </Head>

      <div className='md:flex'>
        {/* Utilizamos el componente Sidebar para renderizar la barra lateral */}
        <aside className='md:w-4/12 xl:w-1/4 2xl:w-1/5'>
          <Sidebar />
        </aside>

        {/* Utilizamos el componente main para renderizar el contenido de la página */}
        <main className='md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll'>
          <div className='p-10'>
            <Pasos />
            {children}
          </div>
        </main>
      </div>

      {/* Utilizamos el componente ModalProducto para renderizar el modal */}
      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto />
        </Modal>
      )}

      {/* Utilizamos el componente ToastContainer para renderizar los mensajes de notificación */}
      <ToastContainer />
    </>
  );
}
