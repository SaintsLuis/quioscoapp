// Importamos el cliente PrismaClient desde el paquete '@prisma/client'
import { PrismaClient } from '@prisma/client';

// Definimos el controlador de la API
export default async function handler(req, res) {
  // Creamos una instancia de PrismaClient
  const prisma = new PrismaClient();

  // Obtener Ordenes
  const ordenes = await prisma.orden.findMany({
    where: {
      estado: false,
    },
  });

  // Enviamos una respuesta con el código de estado 200 y la lista de órdenes en formato JSON
  res.status(200).json(ordenes);

  // Crear Ordenes
  if (req.method === 'POST') {
    // Si la solicitud es de tipo POST, creamos una nueva orden utilizando los datos proporcionados en el cuerpo de la solicitud
    const orden = await prisma.orden.create({
      data: {
        nombre: req.body.nombre,
        total: req.body.total,
        pedido: req.body.pedido,
        fecha: req.body.fecha,
      },
    });

    // Enviamos una respuesta con el código de estado 200 y la orden creada en formato JSON
    res.status(200).json(orden);
  }
}
