import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';

import taskRoutes from './routes/taskRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { specs } from './config/swagger';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for Swagger UI
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customSiteTitle: 'Task Management API',
  customfavIcon: '/favicon.ico',
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #3b82f6 }
  `,
  swaggerOptions: {
    persistAuthorization: true,
  },
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Task Management API is running smoothly! 🚀',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// API routes
app.use('/api/v1/tasks', taskRoutes);

// Root endpoint with API information
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🎯 Welcome to Task Management API',
    version: '1.0.0',
    documentation: '/api-docs',
    health: '/health',
    endpoints: {
      tasks: '/api/v1/tasks',
      stats: '/api/v1/tasks/stats',
    },
    features: [
      'Full CRUD operations',
      'Pagination & filtering',
      'Search functionality',
      'Input validation',
      'Swagger documentation',
      'TypeScript support',
    ],
  });
});

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Task Management API server is running on port ${PORT}`);
  logger.info(`📚 API Documentation available at: http://localhost:${PORT}/api-docs`);
  logger.info(`🏥 Health check available at: http://localhost:${PORT}/health`);
});
