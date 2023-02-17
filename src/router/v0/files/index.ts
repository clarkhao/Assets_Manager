import express from 'express';
import {uploadHandler} from '../.././../controller';

//add authentication middleware
const fileRouter = express.Router();

/**
 * @swagger
 * /files:
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

fileRouter.post('/files', uploadHandler);
fileRouter.get('/files', () => { });
fileRouter.put('/files', () => { });
fileRouter.delete('/files', () => { });

export { fileRouter };