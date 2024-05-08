import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const apisDir = process.env.NODE_ENV === 'production' ? './dist/routes/*.js' : './src/routes/*.ts';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Resource API',
      version: '1.0.0',
      description: 'Swagger API for Problem 5',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],
  },
  apis: [apisDir],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };