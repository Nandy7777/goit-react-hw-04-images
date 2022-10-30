import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  openModal,
  tags,
}) {
  return (
    <GalleryItem onClick={openModal}>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        data-large={largeImageURL}
      />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tegs: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
