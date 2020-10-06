import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const PLACES = [
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
]

const UserPlaces = (props) => {
  const userId = useParams().userId;
  const thisUserPlaces = PLACES.filter(place => place.creator === userId);
  return <PlaceList items={thisUserPlaces} />
};

export default UserPlaces;
