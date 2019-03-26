import React from 'react'

export default function TitleInput({ isValid, isSet, value, handleChange }) {

  const className = "postForm__input" + (isSet ? isValid ?
    " valid" :
    " postForm__input_invalid" :
    "");

  const hintMessage = isValid && isSet ?
    "Заполнено" :
    "Обязательное поле Не более 140 символов";

  return (
    <div className="postForm__group">
      <label className="postForm__label" htmlFor="title">Заголовок</label>
      <input type="text"
        onChange={handleChange}
        value={value}
        className={className}
        name="title"
        id="title" />
      <span className="postForm__hint">{hintMessage}</span>
    </div>
  )
}