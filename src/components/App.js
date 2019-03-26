import React, { useState } from "react";
import AdvertForm from "./form/AdvertForm";
import AdvertList from "./list/AdvertList";

export default function App() {

  const initAdverts = localStorage.getItem('adverts')
    ? JSON.parse(localStorage.getItem('adverts')).sort((ad1, ad2) => (
      ad2.timestamp - ad1.timestamp
    ))
    : [];

  const [adverts, setAdverts] = useState(initAdverts);

  const [isEditing, setEditing] = useState(false);

  const initAdvertState = {
    title: '',
    description: '',
    phone: '',
    city: '',
    image: '',
    imageName: '',
    timestamp: null
  }

  const [currentAdvert, setCurrentAdvert] = useState(initAdvertState);

  const addAdvert = (advert) => {
    const updatedAdverts = [advert].concat(adverts);
    updateAdverts(updatedAdverts)
  }

  const deleteAdvert = (timestamp) => {
    const updatedAdverts = adverts.filter(advert => (
      advert.timestamp !== timestamp
    ))
    updateAdverts(updatedAdverts)
  }

  const editAdvert = advert => {
    setEditing(true)

    setCurrentAdvert({ ...advert })
  }

  const updateAdvert = (updatedAdvert) => {
    setEditing(false)
    const updatedAdverts = adverts.map(advert => (
      advert.timestamp === updatedAdvert.timestamp
        ? updatedAdvert
        : advert
    ))
    updateAdverts(updatedAdverts)
  }

  const updateAdverts = (updatedAdverts) => {
    setAdverts(updatedAdverts);
    localStorage.setItem('adverts', JSON.stringify(updatedAdverts));
    setCurrentAdvert(initAdvertState);
  }

  return (
    <div className="container">
      <AdvertForm
        currentAdvert={currentAdvert}
        isEditing={isEditing}
        addAdvert={addAdvert}
        updateAdvert={updateAdvert} />
      {
        adverts.length > 0
          ? <AdvertList
            adverts={adverts}
            deleteAdvert={deleteAdvert}
            editAdvert={editAdvert} />
          : null
      }
    </div>
  )
}