import express from 'express'
import { BoardsRouter } from './boardRoute'
import { ColumnsRouter } from './columnRoute'
import { CardsRouter } from './cardRoute'
import { MovingCardsRouter } from './movingCardRoute'

const routes = express.Router()

//Check api board
routes.use('/boards', BoardsRouter)

//Column router
routes.use('/columns', ColumnsRouter)
//Card router
routes.use('/cards', CardsRouter)

routes.use('/moving-card', MovingCardsRouter)


export const APIs_v1 = routes