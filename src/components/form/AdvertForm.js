import React, { useState, useEffect } from "react";
import TitleInput from './TitleInput'
import DescriptionTextarea from './DescriptionTextarea'
import PhoneInput from './PhoneInput'
import CityInput from './CityInput'
import ImageInput from './ImageInput'
import '../../styles/form.scss';

const validateRegs = {
  phone: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
  title: /^.{1,140}$/,
  description: /^.{1,300}$/
}

const arrayConcatUnique = (array, value) => (
  array.indexOf(value) === -1
    ? [...array, value]
    : array
)

export default function AdvertFrom({ currentAdvert, isEditing, addAdvert, updateAdvert }) {

  const [advert, setAdvert] = useState(currentAdvert)

  const initFilledFields = Object.keys(currentAdvert).filter(key => (
    Boolean(currentAdvert[key])
  ))

  const [invalidFields, setInvalidFields] = useState([])
  const [touchedFields, setTouhedFields] = useState(initFilledFields)

  const handleInputChange = event => {
    const { name, value } = event.target

    validateInput(name, value)
    setTouhedFields(arrayConcatUnique(touchedFields, name));

    setAdvert({ ...advert, [name]: value })
  }

  useEffect(() => {
    setAdvert(currentAdvert)
  }, [currentAdvert])

  useEffect(() => {
    setTouhedFields(initFilledFields)
  }, [currentAdvert])

  const validateInput = (name, value) => {
    if (!validateRegs[name].test(value)) setInvalidFields(arrayConcatUnique(invalidFields, name))
    else setInvalidFields(invalidFields.filter(fieldName => fieldName !== name))
  }

  const setValues = (values) => {
    setAdvert({
      ...advert,
      ...values
    })
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (formInvalid()) return

    if (isEditing) {
      updateAdvert(advert);
    } else {
      advert.timestamp = Date.now();
      addAdvert(advert);
    }
  }

  const formInvalid = () => (
    Boolean(invalidFields.length)
    || touchedFields.indexOf('title') === -1
    || touchedFields.indexOf('phone') === -1
  )

  return (
    <div className="section">
      <h2 className="section__header">{"Подать объявление"}</h2>
      <form
        className="postForm"
        onSubmit={handleSubmit}>
        <TitleInput
          handleChange={handleInputChange}
          value={advert.title}
          isValid={invalidFields.indexOf('title') === -1}
          isSet={touchedFields.indexOf('title') !== -1} />
        <DescriptionTextarea
          handleChange={handleInputChange}
          value={advert.description}
          isValid={invalidFields.indexOf('description') === -1}
          isSet={touchedFields.indexOf('description') !== -1} />
        <PhoneInput
          handleChange={handleInputChange}
          value={advert.phone}
          isValid={invalidFields.indexOf('phone') === -1}
          isSet={touchedFields.indexOf('phone') !== -1} />
        <CityInput
          handleChange={handleInputChange}
          setValues={setValues}
          value={advert.city} />
        <ImageInput
          image={advert.image}
          imageName={advert.imageName}
          setValues={setValues} />
        <button type="submit" title="Убедитесь что все поля заполнены корректно" className="postForm__submit" disabled={formInvalid()}>
          {isEditing ? 'Сохранить' : 'Подать'}
        </button>
      </form>
    </div>
  )
}

