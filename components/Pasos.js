// Objetivo: Componente para mostrar los pasos de la orden y el progreso actual

import { useRouter } from 'next/router';

// Definimos un array con los pasos de la orden
const pasos = [
  { paso: 1, nombre: 'Menú', url: '/' },
  { paso: 2, nombre: 'Resumen', url: '/resumen' },
  { paso: 3, nombre: 'Datos y Total', url: '/total' },
];

const Pasos = () => {
  // Utilizamos el hook useRouter para acceder a la ruta actual
  const router = useRouter();

  // Función para calcular el progreso actual basado en la ruta actual
  const calcularProgreso = () => {
    let valor = 0;
    if (router.pathname === '/') {
      valor = 2;
    } else if (router.pathname === '/resumen') {
      valor = 50;
    } else {
      valor = 100;
    }
    return valor;
  };

  return (
    <>
      <div className='flex justify-between mb-7'>
        {pasos.map(paso => (
          <button
            onClick={() => {
              router.push(paso.url);
            }}
            className='text-2xl font-bold'
            key={paso.paso}
          >
            {paso.nombre}
          </button>
        ))}
      </div>

      <div className='bg-gray-100 mb-10'>
        <div
          className='rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white'
          style={{ width: `${calcularProgreso()}%` }}
        ></div>
      </div>
    </>
  );
};

export default Pasos;
