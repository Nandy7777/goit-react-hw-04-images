import { useState, useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import ErrorViewImg from '../ErrorView/ErrorView';
import ImageAPI from '../../services/image-api';
import Button from '../Button';
import { Loader } from '../Loader/Loader';
import Modal from '../Modal';
import { Enter, AppWrap } from './App.styled';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  // const [error, setError] = useState(null);
  const [tags, setTags] = useState('null');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (imageName && page) {
      setStatus('pending');

      ImageAPI.fetchImages(imageName, page)
        .then(data => {
          if (data.total === 0) {
            setStatus('rejected');
          }
          setImages(prevState => [...prevState, ...data.hits]);
          setStatus('resolved');
        })
        .catch(error => {
          setStatus('rejected');
        });
    }
  }, [imageName, page]);

  const handleSearchbarSubmit = name => {
    setImageName(name);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(state => state + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = e => {
    const largeImageURL = e.target.dataset.large;
    const tags = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(!showModal);
      setLargeImageURL(largeImageURL);
      setTags(tags);
    }
  };
   
    return (
      <AppWrap>
        <Searchbar onSubmit={handleSearchbarSubmit} />
        {status === 'idle' && <Enter>Enter your search request!</Enter>}
        <ImageGallery images={images} openModal={openModal} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <ErrorViewImg
            message={`No images for your request ${imageName}. Go cry...`}
          />
        )}
        {status === 'resolved' && <Button loadMore={loadMore} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={toggleModal}
          />
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </AppWrap>
    );
}
