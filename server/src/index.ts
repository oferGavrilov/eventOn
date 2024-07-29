import { app, prisma } from './app';
import { config } from './utils/config';
import logger from './logger';

const PORT = config.port;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
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