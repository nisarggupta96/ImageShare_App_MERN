import { useCallback, useReducer } from 'react';

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

export const useForm = (initialInput, initialValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInput,
    isValid: initialValidity,
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

  return [formState, inputHandler];
}
