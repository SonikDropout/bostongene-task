import React from 'react'
import MaskedInput from 'react-text-mask';

export default function PhoneInput({ isValid, isSet, value, handleChange }) {

  const className = "postForm__input" + (isSet ? isValid ?
    " valid" :
    " postForm__input_invalid" :
    "");

  const hintMessage = isValid && isSet ?
    "Заполнено" :
    "Обязательное поле";

  return (
    <div className="postForm__group">
      <label className="postForm__label" htmlFor="phone">Телефон</label>
      <MaskedInput
        mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
        onChange={handleChange}
        value={value}
        className={className}
        showMask={true}
        name="phone"
        id="phone" />
      <span className="postForm__hint">{hintMessage}</span>
    </div>
  )
}