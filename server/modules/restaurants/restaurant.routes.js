import express from 'express'
import { restaurants } from './restaurants.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'

const restaurantRoutes = express.Router()

restaurantRoutes.get('/:restaurant_id', asyncWrapper(restaurants.findOne))
restaurantRoutes.get('/', asyncWrapper(restaurants.findAround))
restaurantRoutes.post('/', asyncWrapper(restaurants.create))
restaurantRoutes.put('/:restaurant_id', asyncWrapper(restaurants.update))
restaurantRoutes.delete('/:restaurant_id', asyncWrapper(restaurants.delete))

export { restaurantRoutes }
