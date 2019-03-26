import React, { useState } from 'react'

export default function CityInput({ value, handleChange, setValues }) {

  const [isOptionsVisible, setOptionsVisible] = useState(false);

  const cityInput = React.createRef()

  const toggleOptions = (event) => {
    if (event.target.className === 'customSelect__unset') return;
    setOptionsVisible(!isOptionsVisible);
  }

  const selectOption = (city) => {
    setValues({ city });
    setOptionsVisible(!isOptionsVisible);
  }

  const selectDefaultOption = () => {
    setValues({ city: '' });
  }

  return (
    <div className="postForm__group">
      <label className="postForm__label">Город</label>
      <input type="hidden" ref={cityInput} name="city" value={value} onChange={handleChange} />
      <div className="postForm__customSelect customSelect">
        <div onClick={toggleOptions} className="customSelect__field">
          {value}
          <span>&#x2304;</span>
          {
            value ?
              <button onClick={selectDefaultOption} className="customSelect__unset">&#x2715;</button> :
              null
          }
        </div>
        <ul className="customSelect__options" style={{ display: isOptionsVisible ? 'block' : 'none' }}>
          <li onClick={() => selectOption('Москва')} className="customSelect__option">Москва</li>
          <li onClick={() => selectOption('Хабаровск')} className="customSelect__option">Хабаровск</li>
          <li onClick={() => selectOption('Чебоксары')} className="customSelect__option">Чебоксары</li>
        </ul>
      </div>
      {
        value ?
          <span className="postForm__hint">Заполнено</span> :
          null
      }
    </div>
  )
}
