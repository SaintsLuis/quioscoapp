// Router Dinamico: pages\api\ordenes\[id].js

// Importamos el cliente PrismaClient desde el paquete '@prisma/client'
import { PrismaClient } from '@prisma/client';

// Definimos el controlador de la API
export default async function handler(req, res) {
  // Creamos una instancia de PrismaClient
  const prisma = new PrismaClient();

  // Verificar el método de la solicitud
  if (req.method === 'POST') {
    // Extraemos el parámetro 'id' de la consulta
    const { id } = req.query;

    // Actualizar el estado de la orden
    const ordenActualizada = await prisma.orden.update({
      where: {
        id: Number(id),
      },
      data: {
        estado: true,
      },
    });

    // Enviamos una respuesta con el código de estado 200 y la orden actualizada en formato JSON
    res.status(200).json(ordenActualizada);
  }
}
