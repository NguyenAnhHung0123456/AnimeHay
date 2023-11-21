import express from 'express'
import filmsRouter from './filmsRouter'
import usersRouter from './usersRouter'
import testRouter from './testRouter'

const router = express.Router()


const routes = (app) => {
    app.use('/films', filmsRouter())
    app.use('/users', usersRouter())
    app.use('/', testRouter())
}

export default routes




