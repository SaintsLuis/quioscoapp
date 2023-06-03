// Importamos el cliente PrismaClient desde el paquete '@prisma/client'
import { PrismaClient } from '@prisma/client';

// Definimos el controlador de la API
export default async function handler(req, res) {
  // Creamos una instancia de PrismaClient
  const prisma = new PrismaClient();

  // Obtener Productos de una Categoría
  const productos = await prisma.producto.findMany({
    where: {
      categoriaId: 1,
    },
  });

  // Enviamos una respuesta con el código de estado 200 y la lista de productos en formato JSON
  res.status(200).json(productos);
}
