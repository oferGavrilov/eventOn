import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './logger';
import cookieParser from 'cookie-parser';
import AppError from './middlewares/errorMiddleware';
import { apiLimiter } from './middlewares/rateLimiter';
import { setupSwagger } from './swagger';
import authRoutes from './routes/authRoutes';
import { config } from './utils/config';
import { PrismaClient } from '@prisma/client';

const app = express();

const setupServer = () => {
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
    });
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
};

setupServer();

export default app;
