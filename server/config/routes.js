import express from 'express'
import { restaurantRoutes } from '../modules/restaurants/restaurant.routes'

const Router = express.Router()

Router.all('/health-check', (req, res) => res.json({ message: 'OK' }))

Router.use('/restaurants', restaurantRoutes)

export { Router }
