import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
const config = require('config');

import {responses} from './openapi/response';
import {schemas} from './openapi/schema';

const routerApiDoc = express.Router();

const options = {
	failOnErrors: true,
	definition: {
		openapi: '3.0.3',
		info: {
			title: 'API Test',
			version: '1.0.0',
		},
		servers: [
			{
				url: config.get('server.host').concat(":").concat(config.get('server.port')),
				description: 'Development server',
			},
		],
		components: {
			responses: responses,
			schemas: schemas,
			securitySchemes: {
				BearerAuth: {
					type: 'apiKey',
          name: 'Authorization',
          schema: 'bearer',
					in: 'header'
				}
			}
		},
		security: [{
      BearerAuth: []
    }]
	},
	apis: [`./src/router/v0/*/*.ts`],
};

const openapiSpecification = swaggerJsdoc(options);
routerApiDoc.use('/api-doc', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

export { routerApiDoc };