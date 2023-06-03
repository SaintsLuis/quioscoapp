export const formatearDinero = cantidad => {
  return cantidad.toLocaleString('es-DO', {
    style: 'currency',
    currency: 'DOP',
  });
};
