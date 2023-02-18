"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../.././../controller");
//add authentication middleware
const fileRouter = express_1.default.Router();
exports.fileRouter = fileRouter;
/**
 * @swagger
 * /v0/files:
 *   post:
 *     description: upload file with requestBody in the multipart/form-data form
 *     requestBody:
 *       description: multipart/form-data form
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: successfully upload files
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 multi:
 *                   type: boolean
 *                   description: are multi files or not uploaded
 *                 result:
 *                   type: string
 *                   description: name of file uploaded successfully
 *               example:
 *                 msg: 'OK'
 *                 multi: false
 *                 result: 'some.jpg'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/FailedAuth'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 *   get:
 *     description: get pagination files with a pageindex parameter
 *     parameters:
 *       - in: query
 *         name: index
 *         schema:
 *           type: integer
 *         required: true
 *         description: index number for pagination
 *     responses:
 *       200:
 *         description: successfully get file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 names:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: array of file names listed
 *               example:
 *                 msg: 'OK'
 *                 names: ['a','b']
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/FailedAuth'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 *   put:
 *     description: update a file with new name
 *     requestBody:
 *       description: name string sent as application/x-www-form-urlencoded
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     parameters:
 *       - in: query
 *         name: filename
 *         schema:
 *           type: string
 *         description: file name key-value pairs to be updated
 *     responses:
 *       200:
 *         description: successfully update file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 update:
 *                   type: boolean
 *                   description: has the update been successfully
 *                 newName:
 *                   type: string
 *                   description: new name of file updated
 *               example:
 *                 msg: 'OK'
 *                 update: true
 *                 newName: 'background.jpg'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/FailedAuth'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 *   delete:
 *     description: delete the file by filename
 *     parameters:
 *       - in: query
 *         name: filename
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: a list of file names key-value pairs to be deleted
 *     responses:
 *       200:
 *         description: successfully update file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 result:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: array of file names deleted
 *                 failed:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: array of file names not deleted
 *               example:
 *                 msg: 'OK'
 *                 result: ['a','b']
 *                 failed: ['c','d']
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/FailedAuth'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 */
fileRouter.post('/v0/files', controller_1.uploadHandler);
fileRouter.get('/v0/files', () => { });
fileRouter.put('/v0/files', () => { });
fileRouter.delete('/v0/files', () => { });
