"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = void 0;
/**
* 描述400以上的响应
*/
exports.responses = {
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
};
