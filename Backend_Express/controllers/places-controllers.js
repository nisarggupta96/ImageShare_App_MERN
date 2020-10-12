const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordinatesFromAddress = require('../utils/locations');
const Place = require('../models/place');

let PLACES = [
  {
    id: 'p1',
    title: 'Taj Mahal',
    description: 'The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg',
    address: 'Agra, Uttar Pradesh',
    location: {
      lat: 27.1751,
      lng: 78.0421,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Leaning Tower of Pisa',
    description: 'Elaborately adorned 14th-century tower (56 meters at its tallest point) with a world-famous lean.',
    image: 'https://public.media.tweentribune.com/tt/header/pisa_600_06-10-15.jpg',
    address: 'Rome',
    location: {
      lat: 43.722952,
      lng: 10.3944083
    },
    creator: 'u2',
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (e) {
    return next(new HttpError('Could not find a place', 500));
  }

  if (!place) {
    return next(new HttpError('Could not find place for placeId', 404));
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlaceByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (e) {
    return next(new HttpError('Could not find places', 500));
  }
  if (places.length === 0) {
    return next(new HttpError('Could not find places for the userId', 404));
  }
  res.json({ places: places.map(place => place.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.warn(errors);
    return next(new HttpError('Invalid inputs passed, please check data', 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinatesFromAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    image: 'https://via.placeholder.com/300',
    address,
    location: coordinates,
    creator,
  });
  
  try {
    await createdPlace.save();
  } catch (e) {
    return next(new HttpError('Creating place failed, try again', 500));
  }
  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn(errors);
    throw new HttpError('Invalid inputs passed, please check data', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (e) {
    return next(new HttpError('Could not update the place', 500));
  }

  if (!place) {
    return next(new HttpError('Could not find place for placeId', 404));
  }

  place.title = title;
  place.description = description;
  try {
    await place.save();
  } catch (e) {
    return next(new HttpError('Could not update the place', 500));
  }
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!PLACES.find(place => place.id === placeId)) {
    throw new HttpError('Could not find place for the id', 404);
  }
  PLACES = PLACES.filter(place => place.id !== placeId);
  res.status(200).json({ message: 'Deleted place' });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
