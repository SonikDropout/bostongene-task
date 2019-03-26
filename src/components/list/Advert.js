import React from 'react';
import placeholder from "../../assets/images/placeholder.jpg";


export default function Advert({ advert, editAdvert, deleteAdvert }) {

  return (
    <div className="advert">
      <div className="advert__rightBlock">
        <h3 className="advert__title">
          {advert.title}
        </h3>
        <p className="advert__description">
          {advert.description}
        </p>
        {
          advert.image ?
            <img src={advert.image} className="advert__image" /> :
            <img src={placeholder} className="advert__image" />
        }
      </div>
      <div className="advert__leftBlock">
        <p className="advert__phone">
          {advert.phone}
        </p>
        {
          advert.city ?
            <p className="advert__city">
              {advert.city}
            </p> :
            null
        }
        <a
          href="#"
          value="Редактировать"
          className="advert__update"
          onClick={() => editAdvert(advert)}>Редактировать</a>
        <input
          type="button"
          value="Удалить"
          className="advert__remove"
          onClick={() => deleteAdvert(advert.timestamp)} />
      </div>
    </div>
  )
}