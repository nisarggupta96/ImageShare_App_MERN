import React from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import './PlaceForm.css';

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

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const placeToUpdate = PLACES.find(place => place.id === placeId);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: placeToUpdate.title,
        isValid: true,
      },
      description: {
        value: placeToUpdate.description,
        isValid: true,
      }
    },
    true,
  );

  if (!placeToUpdate) {
    return <div className='center'>
      <h2>Couldn't find the place</h2>
    </div>
  }

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  return <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
    <Input
      id='title'
      element='input'
      type='text'
      label='Title'
      validators={[VALIDATOR_REQUIRE()]}
      errorText='Please enter correct title'
      onInput={inputHandler}
      initialValue={formState.inputs.title.value}
      initialIsValid={formState.inputs.title.isValid}
    />

    <Input
      id='description'
      element='textarea'
      label='Description'
      validators={[VALIDATOR_MINLENGTH(5)]}
      errorText='Please enter correct description'
      onInput={inputHandler}
      initialValue={formState.inputs.description.value}
      initialIsValid={formState.inputs.title.isValid}
    />

    <Button type='submit' disabled={!formState.isValid}>Update</Button>
  </form>
};

export default UpdatePlace;
