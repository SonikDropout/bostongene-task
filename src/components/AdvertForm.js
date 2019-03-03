import React, { Component } from "react";
import MaskedInput from 'react-text-mask';
import '../styles/form.scss';

export default class AdvertFrom extends Component {
  state = this.initialState;

  get initialState() {
    return {
      isValid: {
        title: true,
        description: true,
        phone: true,
        city: true,
        image: true,
      },
      isSet: {
        title: false,
        description: false,
        phone: false,
        city: false,
        image: false,
      },
      isUpdating: false,
      data: {}
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updatedAdvert) {
      nextState.data = nextProps.updatedAdvert;
      nextState.isUpdating = true;
      nextProps.unsetUpdated();
      for (let key in nextState.data) {
        nextState.isSet[key] = true;
      }
    }
  }

  get formValid() {
    const {
      isValid,
      isSet
    } = this.state;

    for (let key in isValid) {
      if (!isValid[key]) {
        return false;
      }
    }

    return isSet.title && isSet.phone;
  }

  setValue = (key, value, isValid) => {
    let dataCopy = { ...this.state.data };
    let isValidCopy = { ...this.state.isValid };
    let isSetCopy = { ...this.state.isSet };

    isValidCopy[key] = isValid;
    isSetCopy[key] = true;
    dataCopy[key] = value;

    this.setState({
      data: dataCopy,
      isValid: isValidCopy,
      isSet: isSetCopy
    })
  }

  unsetValue = key => {
    let data = { ...this.state.data }
    delete data[key];
    this.setState({ data: data });
  }

  handleTitleChange = event => {
    const value = event.target.value;
    const isValid = value.length < 140 && value.length > 0;

    this.setValue('title', value, isValid);
  }

  handleDescriptionChange = event => {
    const value = event.target.value;
    const isValid = value.length < 300 && value.length > 0;

    this.setValue('description', value, isValid);
  }

  handlePhoneChange = event => {
    const value = event.target.value;
    const pattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    const isValid = pattern.test(value);

    this.setValue('phone', value, isValid);
  }

  handleSubmit = event => {
    event.preventDefault();
    let data = { ...this.state.data }
    const {
      lastAdvertId,
      createAdvert,
    } = this.props;

    if (this.formValid) {
      data.id = data.id || lastAdvertId + 1;
      data.timestamp = Date.now();
      createAdvert(data);
      const initialState = this.initialState;
      this.setState(initialState);
    }
  }

  render() {
    const {
      data,
      isSet,
      isValid,
      isUpdating
    } = this.state;

    return (
      <div className="section">
        <h2 className="section__header">{"Подать объявление"}</h2>
        <form
          className="postForm"
          onSubmit={this.handleSubmit}>
          <TitleInput
            handleChange={this.handleTitleChange}
            value={data.title || ""}
            isValid={isValid.title}
            isSet={isSet.title} />
          <DescriptionTextarea
            handleChange={this.handleDescriptionChange}
            value={data.description || ""}
            isValid={isValid.description}
            isSet={isSet.description} />
          <PhoneInput
            handleChange={this.handlePhoneChange}
            value={data.phone || ""}
            isValid={isValid.phone}
            isSet={isSet.phone} />
          <CityInput
            setValue={this.setValue}
            unsetValue={this.unsetValue}
            value={data.city || ""} />
          <ImageInput
            image={data.image || ""}
            imageName={data.imageName || ""}
            setValue={this.setValue}
            unsetValue={this.unsetValue} />
          <button type="submit" className="postForm__submit" disabled={!this.formValid}>
            {isUpdating ? 'Сохранить' : 'Подать'}
          </button>
        </form>
      </div>
    )
  }
}


class TitleInput extends Component {

  render() {
    const {
      isValid,
      isSet,
      value
    } = this.props;

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
          onChange={this.props.handleChange}
          value={value}
          className={className}
          name="title"
          id="title" />
        <span className="postForm__hint">{hintMessage}</span>
      </div>
    )
  }
}

class DescriptionTextarea extends Component {

  render() {
    const {
      isValid,
      isSet,
      value
    } = this.props;

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
          onChange={this.props.handleChange}
          value={value}
          className={className}
          name="description"
          id="description" />
        <span className="postForm__hint">{hintMessage}</span>
      </div>
    )
  }
}

class PhoneInput extends Component {

  render() {
    const {
      isValid,
      isSet,
      value
    } = this.props;

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
          onChange={this.props.handleChange}
          value={value}
          className={className}
          showMask={true}
          name="phone"
          id="phone" />
        <span className="postForm__hint">{hintMessage}</span>
      </div>
    )
  }
}

class CityInput extends Component {
  state = {
    isOptionsVisible: false
  }

  toggleOptions = (event) => {
    if (event.target.className === 'customSelect__unset') return;
    this.setState({
      isOptionsVisible: !this.state.isOptionsVisible
    })
  }

  selectOption = (value) => {
    this.props.setValue('city', value, true);
    this.setState({
      isOptionsVisible: !this.state.isOptionsVisible
    });
  }

  render() {
    const {
      value,
      unsetValue
    } = this.props;

    const { isOptionsVisible } = this.state;

    return (
      <div className="postForm__group">
        <label className="postForm__label" htmlFor="city">Город</label>
        <select id="city" value={value}>
          <option value=""></option>
          <option value="Москва">Москва</option>
          <option value="Хаборовск">Хаборовск</option>
          <option value="Чебоксары">Чебоксары</option>
        </select>
        <div className="postForm__customSelect customSelect">
          <div onClick={this.toggleOptions} className="customSelect__field">
            {value}
            <span>&#x2304;</span>
            {
              value ?
                <button onClick={() => unsetValue('city')} className="customSelect__unset">&#x2715;</button> :
                null
            }
          </div>
          <ul className="customSelect__options" style={{ display: isOptionsVisible ? 'block' : 'none' }}>
            <li onClick={() => this.selectOption('Москва')} className="customSelect__option">Москва</li>
            <li onClick={() => this.selectOption('Хабаровск')} className="customSelect__option">Хабаровск</li>
            <li onClick={() => this.selectOption('Чебоксары')} className="customSelect__option">Чебоксары</li>
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
}


class ImageInput extends Component {
  fileInput = React.createRef();

  handleChange = event => {
    const file = event.target.files[0];
    if (!file) return;
    this.encodeImage(file);
  }

  encodeImage(file) {
    const imageName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const encodedImage = event.target.result;
      this.props.setValue('image', encodedImage, true);
      this.props.setValue('imageName', imageName, true);
    }
  }

  unsetImage = () => {
    this.fileInput.current.value = "";
    this.props.unsetValue('imageName');
    this.props.unsetValue('image');
  }

  resetImage = () => {
    this.fileInput.current.click();
  }

  render() {
    const {
      image,
      imageName,
    } = this.props;

    return (
      <div className="postForm__group postForm__group_file">
        <label className="postForm__file" htmlFor="image"><span>Прикрепить фото</span></label>
        <input
          ref={this.fileInput}
          id="image"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={this.handleChange} />
        {
          image ?
            <ImageThumbnail reset={this.resetImage} name={imageName} image={image} unset={this.unsetImage} /> :
            null
        }
      </div>
    )
  }
}

function ImageThumbnail(props) {
  const { name, unset, image, reset } = props;
  return (
    <div className="imageThumb">
      <img src={image} className="imageThumb__img" alt="Прикреплённое фото" />
      <p className="imageThumb__name" onClick={reset}>{name}</p>
      <p className="imageThumb__unset" onClick={unset}>Удалить</p>
    </div>
  )
}

