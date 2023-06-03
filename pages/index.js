import Layout from '@/layout/Layout';
import Producto from '@/components/Producto';
import useQuiosco from '@/hooks/useQuiosco';

// Definimos el componente Home que representa la página de inicio
export default function Home() {
  // Obtenemos la categoría actual desde el hook useQuiosco
  const { categoriaActual } = useQuiosco();

  return (
    // Utilizamos el componente Layout para establecer la estructura de la página
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className='text-3xl font-black'>{categoriaActual?.nombre}</h1>
      <p className='text-2xl my-6'>
        Elige y personaliza tu pedido a continuación
      </p>

      {/* Renderizamos los productos de la categoría actual */}
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {/* Iteramos sobre los productos de la categoría actual y renderizamos el componente Producto */}
        {categoriaActual?.productos?.map(producto => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </Layout>
  );
}
