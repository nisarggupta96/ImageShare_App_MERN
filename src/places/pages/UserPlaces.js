import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const PLACES = [
  {
    id: 'p1',
    title: 'Taj Mahal',
    description: 'The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra',
    image: 'https://dummyimage.com/400',
    address: 'Agra, Uttar Pradesh',
    location: {
      lat: 27.1751,
      long: 78.0421,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 't2',
    description: 'desc2',
    image: 'https://dummyimage.com/400',
    address: 'add2',
    location: {
      lat: 50,
      long: 100
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
