const uuid = require('uuid').v4;
const HttpError = require('../models/http-error');

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = PLACES.find(place => place.id === placeId);
  if (!place) {
    throw new HttpError('Could not find place for placeId', 404);
  }
  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = PLACES.filter(place => place.creator === userId);
  if (places.length === 0) {
    return next(new HttpError('Could not find places for the userId', 404));
  }
  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...PLACES.find(place => place.id === placeId) };
  placeIndex = PLACES.findIndex(place => place.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  PLACES = PLACES.filter(place => place.id !== placeId);
  res.status(200).json({ message: 'Deleted place' });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
