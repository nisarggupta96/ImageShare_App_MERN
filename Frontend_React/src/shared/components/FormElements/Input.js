import React, { useReducer, useEffect } from 'react';

import { validate } from '../../utils/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      }
    default:
      return state;
  }
};

/**
 * 
 * @param {{
 *  id: string, 
 *  element: string
 *  type: [string], 
 *  placeholder:string, 
 *  onChange: function 
 *  value: string,
 *  onBlur: function
 *  validators: Array<function>,
 *  errorText: string,
 *  onInput: function,
 *  value: [string],
 *  valid: [boolean]
 * }} props 
 */
const Input = (props) => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialIsValid || false,
    isTouched: false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
  };

  const touchedHandler = () => {
    dispatch({ type: 'TOUCH' });
  }

  const inputElement = props.element === 'input' ?
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      value={inputState.value}
      onBlur={touchedHandler}
    /> :
    <textarea
      id={props.id}
      placeholder={props.placeholder}
      rows={props.rows || 3}
      onChange={changeHandler}
      value={inputState.value}
      onBlur={touchedHandler}
    />;

  return <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
    <label htmlFor={props.id}>{props.label}</label>
    {inputElement}
    {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
  </div>
};

export default Input;
