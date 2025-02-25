import express from 'express'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
const boardRoute = express.Router()

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     description: API để tạo board mới với validation bằng Joi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBoard'
 *     responses:
 *       201:
 *         description: Tạo user thành công
 *       400:
 *         description: Lỗi request không hợp lệ
 */
boardRoute.route('/')
  .post(boardValidation.createNew, boardController.createNew)

/**
* @swagger
* /boards:
*   put:
*     summary: Update a new board
*     description: API để tạo board mới với validation bằng Joi
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UpdateBoard'
*     responses:
*       201:
*         description: Update board thành công
*       400:
*         description: Lỗi request không hợp lệ
*/
boardRoute.route('/:id')
  .put(boardValidation.updateData, boardController.updateData)

boardRoute.route('/:id')
  .get(boardController.findById)
export const BoardsRouter = boardRoute