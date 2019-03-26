import React from 'react';

export default function ImageInput({ image, imageName, setValues }) {

  const fileInput = React.createRef();

  const handleChange = event => {
    const file = event.target.files[0];
    if (!file) return;
    handleImage(file);
  }

  const handleImage = (file) => {
    const imageName = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const image = event.target.result;
      setValues({ imageName, image });
    }
  }

  const unsetImage = () => {
    fileInput.current.value = '';
    setValues({ imageName: '', image: '' });
  }

  const resetImage = () => {
    fileInput.current.click();
  }

  return (
    <div className="postForm__group postForm__group_file">
      <label className="postForm__file" htmlFor="image"><span>Прикрепить фото</span></label>
      <input
        ref={fileInput}
        id="image"
        type="file"
        accept="image/*"
        style={{ position: "absolute", top: -9999, left: -9999 }}
        onChange={handleChange} />
      {
        image ?
          <ImageThumbnail reset={resetImage} name={imageName} image={image} unset={unsetImage} /> :
          null
      }
    </div>
  )
}

function ImageThumbnail({ image, name, unset, reset }) {
  return (
    <div className="imageThumb">
      <img src={image} className="imageThumb__img" alt="Прикреплённое фото" />
      <p className="imageThumb__name" onClick={reset}>{name}</p>
      <p className="imageThumb__unset" onClick={unset}>Удалить</p>
    </div>
  )
}