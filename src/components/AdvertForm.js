import React, { Component } from "react";
import MaskedInput from 'react-text-mask';
import '../styles/form.scss';

export default class AdvertFrom extends Component {
  state = {
    isFieldsValid: true,
    isRequiredSet: {
      title: false,
      phone: false,
    },
    data: {}
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updatedAdvert) {
      nextState.data = nextProps.updatedAdvert;
    }
  }

  get formValid() {
    const {
      isFieldsValid,
      isRequiredSet
    } = this.state;

    const allRequiredSet = isRequiredSet.title && isRequiredSet.phone;

    return allRequiredSet && isFieldsValid;
  }

  setRequiredSet = key => {
    let isRequiredSet = { ...this.state.isRequiredSet };
    isRequiredSet[key] = true;
    this.setState({
      isRequiredSet: isRequiredSet
    });
  }

  setValidity = flag => {
    this.setState({
      isFieldsValid: flag
    })
  }

  setValue = (key, value) => {
    let data = { ...this.state.data }
    data[key] = value;
    this.setState({
      data: data
    })
  }

  unsetValue = key => {
    let data = { ...this.state.data }
    delete data[key];
    this.setState({ data });
  }

  handleSubmit = event => {
    event.preventDefault();
    let data = { ...this.state.data }
    const {
      lastAdvertId,
      createAdvert,
      finishedUpdating
    } = this.props;

    if (this.formValid) {
      const newAdvertId = lastAdvertId + 1;
      data.id = newAdvertId;
      createAdvert(data);
      finishedUpdating();
      this.setState({ data: {} })
    }
  }

  render() {
    const { data } = this.state;
    console.log(data.title);

    return (
      <div className="section">
        <h2 className="section__header">{"Подать объявление"}</h2>
        <form
          className="postForm"
          onSubmit={this.handleSubmit}>
          <TitleInput value={data.title || ""} notifyIsSet={this.setRequiredSet} setFormValidity={this.setValidity} setValue={this.setValue} />
          <DescriptionTextarea value={data.description || ""} setFormValidity={this.setValidity} setValue={this.setValue} />
          <PhoneInput value={data.phone || ""} notifyIsSet={this.setRequiredSet} setFormValidity={this.setValidity} setValue={this.setValue} />
          <CityInput value={data.city || ""} setValue={this.setValue} />
          <ImageInput value={data.image || ""} setValue={this.setValue} unsetValue={this.unsetValue} />
          <button type="submit" className="btn postForm__submit">
            Подать
          </button>
        </form>
      </div>
    )
  }
}

class TitleInput extends Component {
  state = {
    isValid: false,
    value: this.props.initialValue,
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.value = nextProps.value;
    if (nextProps.value !== "") {
      nextState.isValid = true;
    }
  }

  handleChange = event => {
    const value = event.target.value;
    const isValid = value.length < 140 && value.length > 0;
    const {
      notifyIsSet,
      setFormValidity,
      setValue
    } = this.props;

    notifyIsSet('title');
    setFormValidity(isValid);
    isValid ? setValue('title', value) : null;

    this.setState({
      value: value,
      isValid: isValid
    });
  }

  render() {
    const {
      isValid,
      value
    } = this.state;

    const className = "postForm__input" + (isValid ?
      " postFrom__input_valid" :
      " postForm__input_invalid");

    const hintMessage = isValid ?
      "Заполнено" :
      "Обязательное поле Не более 140 символов";

    return (
      <div className="postForm__group">
        <label className="postForm__label" htmlFor="title">Заголовок</label>
        <input type="text"
          onChange={this.handleChange}
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
  state = {
    isValid: false,
    value: this.props.initialValue,
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.value = nextProps.value;
    if (nextProps.value !== "") {
      nextState.isValid = true;
    }
  }

  handleChange = event => {
    const value = event.target.value;
    const isValid = value.length < 300 && value.length > 0;

    this.props.setFormValidity(isValid);
    isValid ? this.props.setValue('description', value) : null;

    this.setState({
      value: value,
      isValid: isValid
    });
  }

  render() {
    const {
      isValid,
      value
    } = this.state;

    const className = "postForm__input" + (isValid ?
      " postFrom__input_valid" :
      " postForm__input_invalid");

    const hintMessage = isValid ?
      "Заполнено" :
      "Не более 300 символов";

    return (
      <div className="postForm__group">
        <label className="postForm__label" htmlFor="description">Описание</label>
        <textarea
          onChange={this.handleChange}
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
  state = {
    isValid: false,
    value: this.props.initialValue,
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.value = nextProps.value;
    if (nextProps.value !== "") {
      nextState.isValid = true;
    }
  }

  handleChange = event => {
    const value = event.target.value;
    const pattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    const isValid = pattern.test(value);
    const {
      notifyIsSet,
      setFormValidity,
      setValue
    } = this.props;

    notifyIsSet('phone');
    setFormValidity(isValid);
    setValue('phone', value);

    this.setState({
      value: value,
      isValid: isValid
    });

  }

  render() {
    const {
      isValid,
      value
    } = this.state;

    const className = "postForm__input" + (isValid ?
      " postFrom__input_valid" :
      " postForm__input_invalid");

    const hintMessage = isValid ?
      "Заполнено" :
      "Обязательное поле";

    return (
      <div className="postForm__group">
        <label className="postForm__label" htmlFor="phone">Телефон</label>
        <MaskedInput
          mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
          onChange={this.handleChange}
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
    value: this.props.initialValue,
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.value = nextProps.value;
  }

  handleChange = event => {
    const value = event.target.value;
    this.props.setValue('city', value);
    this.setState({
      value: value
    });
  }

  render() {
    const {
      value
    } = this.state;

    const className = "postForm__input" + isFilled ?
      " postFrom__input_valid" :
      " postForm__input_invalid";

    const hint = value ?
      <span className="postForm__hint">Заполнено</span> :
      null;

    return (
      <div className="postForm__group">
        <label className="postForm__label" htmlFor="city">Город</label>
        <select id="city" className="postFrom__select" value={this.state.value} onChange={this.handleChange}>
          <option className="postFrom__option" value="">Не выбран</option>
          <option className="postFrom__option" value="Москва">Москва</option>
          <option className="postFrom__option" value="Хаборовск">Хаборовск</option>
          <option className="postFrom__option" value="Чебоксары">Чебоксары</option>
        </select>
        {hint}
      </div>
    )
  }
}


class ImageInput extends Component {
  state = {
    image: this.props.initialValue,
    imageName: ""
  }

  fileInput = React.createRef();

  componentWillUpdate(nextProps, nextState) {
    nextState.image = nextProps.value;
  }

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
      this.props.setValue('image', encodedImage);
      this.setState({
        image: encodedImage,
        imageName: imageName,
      })
    }
  }

  unsetImage = () => {
    this.setState({
      image: "",
      imageName: "",
    });
    this.fileInput.current.value = "";
    this.props.unsetValue('image');
  }

  resetImage = () => {
    this.fileInput.current.click();
  }

  render() {
    const {
      image,
      imageName,
      file
    } = this.state;

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

