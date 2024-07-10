import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'eventOn API',
        version: '1.0.0',
        description: 'API documentation for the eventOn project',
    },
    server: [
        {
            url: 'http://localhost:3000',
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: express.Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
