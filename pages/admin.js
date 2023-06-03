import useSWR from 'swr';
import axios from 'axios';
import AdminLayout from '@/layout/AdminLayout';
import Orden from '@/components/Orden';

// Definimos el componente Admin que representa la página de administración
export default function Admin() {
  // Definimos la función fetcher que utiliza axios para obtener los datos de las órdenes desde la API
  const fetcher = () => axios('/api/ordenes').then(datos => datos.data);

  // Utilizamos el hook useSWR para obtener los datos de las órdenes y manejar el estado de carga y errores
  const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {
    refreshInterval: 100,
  });

  // console.log(data);
  // console.log(error);
  // console.log(isLoading);

  return (
    <>
      {/* Utilizamos el componente AdminLayout para establecer la estructura de la página de administración */}
      <AdminLayout pagina='Admin'>
        <h1 className='text-4xl font-black'>Panel de Administración</h1>
        <p className='text-2xl my-10'>Administra las Órdenes</p>

        {/* Verificamos si existen datos y si la longitud de los datos es mayor a cero */}
        {data && data.length ? (
          // Si existen datos y la longitud es mayor a cero, iteramos sobre los datos y renderizamos el componente Orden para cada orden
          data.map(orden => <Orden key={orden.id} orden={orden} />)
        ) : (
          // Si no hay datos o la longitud de los datos es cero, mostramos un mensaje indicando que no hay órdenes pendientes
          <p>No hay órdenes pendientes</p>
        )}
      </AdminLayout>
    </>
  );
}
