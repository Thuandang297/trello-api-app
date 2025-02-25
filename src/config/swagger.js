import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import { boardValidation } from '~/validations/boardValidation'
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Trello app Documentation',
      version: '1.0.0',
      description: 'API docs using Swagger'
    },
    components: {
      schemas: {
        CreateBoard: boardValidation.createBoardSwagger,
        UpdateBoard: boardValidation.updateBoardSwagger
      }
    },
    servers: [
      {
        // url: 'localhost:5000',
        description: 'Local server'
      }
    ]
  },
  apis: [path.join(__dirname, '../routes/*/*.js')] // Đọc API từ các file trong thư mục routes
}

const swaggerSpec = swaggerJSDoc(options)

export const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
