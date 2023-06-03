// Importamos el cliente PrismaClient desde el paquete '@prisma/client'
import { PrismaClient } from '@prisma/client';

// Definimos el controlador de la API
export default async function handler(req, res) {
  // Creamos una instancia de PrismaClient
  const prisma = new PrismaClient();

  // Realizamos una consulta a la base de datos utilizando Prisma para obtener todas las categorías y sus productos asociados
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true,
    },
  });

  // Enviamos una respuesta con el código de estado 200 y la lista de categorías en formato JSON
  res.status(200).json(categorias);
}
