import '@/styles/globals.css';

// Importamos el QuioscoProvider desde el contexto
import { QuioscoProvider } from '@/context/QuioscoProvider';

// Definimos el componente MyApp que es el punto de entrada de la aplicación
export default function MyApp({ Component, pageProps }) {
  return (
    // Utilizamos el QuioscoProvider como envoltorio para proporcionar el contexto a todos los componentes
    <QuioscoProvider>
      {/* Renderizamos el componente pasado como prop y pasamos las propiedades de la página */}
      <Component {...pageProps} />
    </QuioscoProvider>
  );
}
