import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalImg } from './Modal.styled';

export default function Modal({ largeImageURL, tags, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return (() => {
      window.removeEventListener('keydown', handleKeyDown);
    })
  })
 
  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClickBackdrop}>
      <ModalImg>
        <img src={largeImageURL} alt={tags} loading="lazy" />
      </ModalImg>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};