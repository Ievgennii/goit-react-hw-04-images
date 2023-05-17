import React, { Component } from 'react';
import css from './styles.module.css';

class ImageGalleryItem extends Component {
  handleClick = largeImageURL => {
    this.props.onImageClick(largeImageURL);
  };
  render() {
    const { images } = this.props;
    return (
      <>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <li key={id} className={css.ImageGalleryItem}>
            <img
              className={css.ImageGalleryItemImage}
              src={webformatURL}
              alt={tags}
              onClick={() => this.handleClick(largeImageURL)}
            />
          </li>
        ))}
      </>
    );
  }
}

export default ImageGalleryItem;
