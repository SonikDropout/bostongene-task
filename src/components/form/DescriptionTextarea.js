import React from 'react'

export default function DescriptionTextarea({ isValid, isSet, value, handleChange }) {

  const className = "postForm__input" + (isSet ? isValid ?
    " valid" :
    " postForm__input_invalid" :
    "");

  const hintMessage = isValid && isSet ?
    "Заполнено" :
    "Не более 300 символов";

  return (
    <div className="postForm__group">
      <label className="postForm__label" htmlFor="description">Описание</label>
      <textarea
        onChange={handleChange}
        value={value}
        className={className}
        name="description"
        id="description" />
      <span className="postForm__hint">{hintMessage}</span>
    </div>
  )
}