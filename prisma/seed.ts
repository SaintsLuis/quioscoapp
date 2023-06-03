import { categorias } from './data/categorias';
import { productos } from './data/productos';
import { PrismaClient } from '@prisma/client';

// Instancia de Prisma Client
const prisma = new PrismaClient();

// Función principal asincrónica
const main = async (): Promise<void> => {
  try {
    // Crear registros de categorías en la base de datos
    await prisma.categoria.createMany({
      data: categorias,
    });

    // Crear registros de productos en la base de datos
    await prisma.producto.createMany({
      data: productos,
    });
  } catch (error) {
    console.log(error);
  } finally {
    // Cerrar la conexión de Prisma Client
    await prisma.$disconnect();
  }
};

// Ejecutar la función principal
main();
