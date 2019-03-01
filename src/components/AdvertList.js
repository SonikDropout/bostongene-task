import React from "react";
import placeholder from "../assets/images/placeholder.jpg";
import "../styles/advert.scss";

export default function AdvertList(props) {
  const {
    adverts,
    update,
    remove,
  } = props;

  const advertsList = adverts.map((advert, i) => {
    return <Advert data={advert} update={update} remove={remove} key={i} />;
  });

  return (
    <section className="section">
      <h2 className="section__header">{"Объявления"}</h2>
      {advertsList}
    </section>
  )
}

function Advert(props) {
  const {
    data,
    update,
    remove,
  } = props;

  return (
    <div className="advert">
      <div className="advert__rightBlock">
        <h3 className="advert__title">
          {data.title}
        </h3>
        <p className="advert__description">
          {data.description}
        </p>
        {
          data.image ?
            <img src={data.image} className="advert__image" /> :
            <img src={placeholder} className="advert__image" />
        }
      </div>
      <div className="advert__leftBlock">
        <p className="advert__phone">
          {data.phone}
        </p>
        {
          data.city ?
            <p className="advert__city">
              {data.city}
            </p> :
            null
        }
        <a
          href="#"
          value="Редактировать"
          className="advert__update"
          onClick={() => update(data.id)}>Редактировать</a>
        <input
          type="button"
          value="Удалить"
          className="advert__remove"
          onClick={() => remove(data.id)} />
      </div>
    </div>
  )
}