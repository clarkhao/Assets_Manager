"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApiDoc = void 0;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const config = require('config');
const response_1 = require("./openapi/response");
const schema_1 = require("./openapi/schema");
const routerApiDoc = express_1.default.Router();
exports.routerApiDoc = routerApiDoc;
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
            responses: response_1.responses,
            schemas: schema_1.schemas,
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
const openapiSpecification = (0, swagger_jsdoc_1.default)(options);
routerApiDoc.use('/api-doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapiSpecification));
