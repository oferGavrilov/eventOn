import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './logger';
import { json } from 'body-parser';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { apiLimiter } from './middlewares/rateLimiter';
import { setupSwagger } from './swagger';

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

app.use('/api/', apiLimiter); // Rate limiter (100 requests per 15 minutes

// Routes


setupSwagger(app);

app.use(errorMiddleware); // Error middleware

export default app;
