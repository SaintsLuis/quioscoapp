import { useContext } from 'react';
import QuioscoContext from '@/context/QuioscoProvider';

const useQuiosco = () => {
  // Utiliza la función useContext para acceder al contexto QuioscoContext
  return useContext(QuioscoContext);
};

export default useQuiosco;

// Este hook useQuiosco permite a los componentes acceder al estado y las funciones proporcionadas por QuioscoProvider sin la necesidad de envolver esos componentes en <QuioscoProvider>. Simplemente importando y utilizando este hook en un componente, se puede acceder al contexto y utilizar los valores y funciones proporcionados por QuioscoProvider.
