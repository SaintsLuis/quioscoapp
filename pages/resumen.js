import Layout from '@/layout/Layout';
import ResumenProducto from '@/components/ResumenProducto';
import useQuiosco from '@/hooks/useQuiosco';

// Definimos el componente Resumen que representa la página de resumen del pedido
export default function Resumen() {
  // Obtenemos el pedido desde el hook useQuiosco
  const { pedido } = useQuiosco();

  return (
    // Utilizamos el componente Layout para establecer la estructura de la página
    <Layout pagina='Resumen'>
      <h1 className='text-3xl font-black'>Resumen</h1>
      <p className='text-2xl my-6'>Revisa tu Pedido</p>

      {/* Verificamos si el pedido está vacío */}
      {pedido.length === 0 ? (
        <p className='text-2xl mt-10 text-center'>
          No hay productos en tu pedido
        </p>
      ) : (
        // Renderizamos los productos del pedido
        pedido.map(producto => (
          <ResumenProducto key={producto.id} producto={producto} />
        ))
      )}
    </Layout>
  );
}
