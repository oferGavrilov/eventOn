import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './logger';
import cookieParser from 'cookie-parser';
import AppError from './middlewares/errorMiddleware';
import { apiLimiter } from './middlewares/rateLimiter';
import { setupSwagger } from './swagger';
import { authRoutes } from './routes';
import { config } from './utils/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
let server: any;

async function bootstrap() {
  // Security HTTP headers
  app.use(helmet());

  // Body parser
  app.use(express.json({ limit: '10kb' }));
  app.use(cookieParser());

  // CORS
  app.use(cors({
    origin: [config.origin],
    credentials: true,
  }));

  // Logger
  app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

  // Rate limiter (100 requests per 15 minutes)
  app.use('/api/', apiLimiter);

  // Routes
  app.use('/api/auth', authRoutes);

  // Swagger Setup
  setupSwagger(app);

  // Health checker
  app.get('/api/healthchecker', (_: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to EventOn Server! 🚀',
    })
  });

  // UNHANDLED ROUTES
  app.all('*', (req: Request, _: Response, next: NextFunction) => {
    next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
  });

  // GLOBAL ERROR HANDLER
  app.use((err: AppError, _: Request, res: Response, __: NextFunction) => {
    logger.error(err);

    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  });

  const PORT = config.port;
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
}

// Graceful shutdown
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

bootstrap()
  .catch((err) => {
    logger.error('Error starting server: ', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default app;
