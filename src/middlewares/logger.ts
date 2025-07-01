// src/middlewares/logger.ts
import morgan from 'morgan';
import { logger } from '../utils/logger';
// Add custom tokens
morgan.token('user-id', (req: any) => req.user?._id || 'anonymous');
morgan.token('user-role', (req: any) => req.user?.role || 'guest');

// Pipe Morgan logs into Winston
export const loggerMiddleware = morgan(
  ':method :url :status - :response-time ms [user-id=:user-id role=:user-role]',
  {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  }
);
