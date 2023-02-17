import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
const config = require('config');

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
			responses: {
				BadRequest: {
					description: '400 Client side errors',
					content: {
						'application/json': {
							schema: {
								'$ref': '#/components/schemas/SimpleMessage'
							}
						}
					}
				},
				FailedAuth: {
					description: '401 Authentication information is missing or invalid',
					content: {
						'application/json': {
							schema: {
								'$ref': '#/components/schemas/SimpleMessage'
							}
						}
					}
				},
				NotFound: {
					description: '404 The user name or email not found or invalid',
					content: {
						'application/json': {
							schema: {
								'$ref': '#/components/schemas/SimpleMessage'
							}
						}
					}
				},
				ServerMistake: {
					description: '500 Server Inner Mistake',
					content: {
						'application/json': {
							schema: {
								'$ref': '#/components/schemas/SimpleMessage'
							}
						}
					}
				}
			},
			schemas: {
				SimpleMessage: {
					type: 'object',
					properties: {
						message: {
							type: 'string'
						}
					}
				}
			},
			securitySchemes: {
				bearerAuth: {
					type: 'apiKey',
          name: 'Authorization',
          schema: 'bearer',
					in: 'header'
				}
			}
		},
		security: [{
      bearerAuth: []
    }]
	},
	apis: [`./src/router/v0/*/*.ts`],
};

const openapiSpecification = swaggerJsdoc(options);
routerApiDoc.use('/api-doc', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

export { routerApiDoc };