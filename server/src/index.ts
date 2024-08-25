import app from './app';
import prisma from './prisma'
import { config } from './utils/config';
import logger from './logger';

const PORT = config.port;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

const gracefulShutdown = async () => {
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default server;