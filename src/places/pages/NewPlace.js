import React, { useCallback, useReducer } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import './NewPlace.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formValid = true;

      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formValid = formValid && action.isValid;
        } else {
          formValid = formValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,

        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          }
        },

        isValid: formValid,
      };
    default:
      return state;
  }
}

const NewPlace = () => {

  // To maintain overall form validity
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      }
    },
    isValid: false,
  });

  // useCallback to prevent handler from being called again in case component re-renders
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      inputId: id,
      value: value,
      isValid: isValid
    })
  }, []);

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  return <form className='place-form' onSubmit={placeSubmitHandler}>
    <Input
      id='title'
      element='input'
      type='text'
      label='Title'
      validators={[VALIDATOR_REQUIRE()]}
      errorText='Please enter valid title'
      onInput={inputHandler}
    />
    <Input
      id='description'
      element='textarea'
      label='Description'
      validators={[VALIDATOR_MINLENGTH(5)]}
      errorText='Please enter valid description'
      onInput={inputHandler}
    />
    <Input
      id='address'
      element='input'
      label='Address'
      validators={[VALIDATOR_REQUIRE()]}
      errorText='Please enter valid address'
      onInput={inputHandler}
    />

    <Button type='submit' disabled={!formState.isValid}>
      Add
    </Button>
  </form>
};

export default NewPlace;
