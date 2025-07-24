import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'A comprehensive REST API for managing tasks with full CRUD operations, pagination, filtering, and search capabilities.',
      contact: {
        name: 'API Support',
        email: 'support@taskmanagement.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Tasks',
        description: 'Task management operations',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

export const specs = swaggerJsdoc(options);
