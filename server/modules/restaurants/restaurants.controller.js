import { restaurantModel } from './restaurant.model'
import { httpStatus } from '../../utils/httpStatus'

const restaurants = {}

restaurants.findOne = async (req, res) => {
  let restaurant = await restaurantModel.findById(req.params.restaurant_id)
  return res.json(restaurant)
}

restaurants.findAround = async (req, res) => {
  const longCoordinates = req.query.long_coordinates
  const latCoordinates = req.query.lat_coordinates
  let maxDistance = req.query.max_distance
  if (!maxDistance) maxDistance = 5000
  let restaurant = await restaurantModel.find({ location: { $near: { $geometry: { type: 'Point', coordinates: [longCoordinates, latCoordinates] }, $maxDistance: maxDistance } } })
  return res.json(restaurant)
}

restaurants.create = async (req, res) => {
  let restaurant = await restaurantModel.create(req.body)
  return res.status(httpStatus.CREATED).json(restaurant)
}

restaurants.update = async (req, res) => {
  let restaurant = await restaurantModel.findById(req.params.restaurant_id)
  if (!restaurant) return res.status(httpStatus.BAD_REQUEST).json({ message: 'restaurant not found' })
  Object.assign(restaurant, req.body)
  await restaurant.save()
  return res.json(restaurant)
}

restaurants.delete = async (req, res) => {
  let restaurant = await restaurantModel.findById(req.params.restaurant_id)
  if (!restaurant) return res.status(httpStatus.BAD_REQUEST).json({ message: 'restaurant not found' })
  await restaurant.delete()
  if (!restaurant) return res.json({ message: 'restaurant deleted' })
}

export { restaurants }
