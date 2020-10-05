import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formValid = true;

      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
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

    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formValid
      }
    default:
      return state;
  }
}

/**
 * @param {Object} initialInput 
 * @param {boolean} initialValidity 
 * @returns {[formState: Object, inputHandler: Function, setFormData: Function]}
 */
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

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formValid: formValidity
    })
  }, []);

  return [formState, inputHandler, setFormData];
}
