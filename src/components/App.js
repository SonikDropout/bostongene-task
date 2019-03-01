import React, { Component } from "react";
import AdvertForm from "./AdvertForm";
import AdvertList from "./AdvertList";

export default class App extends Component {
  state = {
    adverts: [],
    isDeleting: false,
    updatedAdvert: null
  }

  setAdverts(adverts) {
    const advertsJSON = JSON.stringify(adverts);
    localStorage.setItem('adverts', advertsJSON);
    this.setState({
      adverts: adverts
    })
  }

  createAdvert = (data) => {
    const { adverts } = this.state;
    const filteredAdverts = adverts.filter(advert => {
      return advert.id !== data.id;
    });
    const newAdverts = [data].concat(filteredAdverts);
    this.setAdverts(newAdverts);
  }

  deleteAdvert = (id) => {
    const { adverts } = this.state;
    const updatedAdverts = adverts.filter(advert => {
      return advert.id !== id;
    });
    this.setAdverts(updatedAdverts);
  }

  updateAdvert = (id) => {
    const { adverts } = this.state;
    const advertToUpdate = adverts.filter(advert => advert.id === id)[0];
    this.setState({
      updatedAdvert: { ...advertToUpdate }
    })
  }

  unsetUpdated = () => {
    this.setState({
      updatedAdvert: null
    })
  }

  componentWillMount() {
    const advertsString = localStorage.getItem('adverts');
    if (advertsString) {
      const adverts = JSON.parse(advertsString);
      const sortedAdverts = adverts.sort((advert1, advert2) => {
        return advert2.timestamp - advert1.timestamp;
      });
      this.setState({
        adverts: adverts
      })
    }
  }

  render() {
    const { adverts, updatedAdvert } = this.state;
    const lastAdvert = adverts[0];
    const lastAdvertId = lastAdvert ? lastAdvert.id : 0;
    return (
      <div className="container">
        <AdvertForm
          updatedAdvert={updatedAdvert}
          createAdvert={this.createAdvert}
          unsetUpdated={this.unsetUpdated}
          deleteAdvert={this.deleteAdvert}
          lastAdvertId={lastAdvertId} />
        {
          adverts.length > 0 ?
            <AdvertList
              adverts={adverts}
              remove={this.deleteAdvert}
              update={this.updateAdvert} /> :
            null
        }
      </div>
    )
  }
}