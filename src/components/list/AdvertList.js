import React from "react";
import Advert from './Advert'
import '../../styles/advert.scss'

export default function AdvertList({ adverts, deleteAdvert, editAdvert }) {

  return (
    <section className="section">
      <h2 className="section__header">{"Объявления"}</h2>
      {
        adverts.map((advert) => (
          <Advert
            advert={advert}
            deleteAdvert={deleteAdvert}
            editAdvert={editAdvert}
            key={advert.timestamp} />
        ))
      }
    </section>
  )
}

