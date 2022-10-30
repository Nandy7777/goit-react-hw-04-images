import { Component } from 'react';
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

export default class App extends Component {
  state = {
    imageName: '',
    images: [],
    error: null,
    status: 'idle',
    tags: null,
    page: 1,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.fetchImages(nextName, nextPage);
    }
  }

  fetchImages(nextName, nextPage) {
    ImageAPI.fetchImages(nextName, nextPage)
      .then(data => {
        if (data.total === 0) {
          return this.setState({
            status: 'rejected',
            images: [],
          });
        }
        this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            status: 'resolved',
            imageName: nextName,
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  handleSearchbarSubmit = name => {
    this.setState({ imageName: name, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    const largeImageURL = e.target.dataset.large;
    const tags = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        largeImageURL: largeImageURL,
        tags: tags,
      }));
    }
  };

  render() {
    return (
      <AppWrap>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        {this.state.status === 'idle' && (
          <Enter>Enter your search request!</Enter>
        )}
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {this.state.status === 'pending' && (<Loader />)}
        {this.state.status === 'rejected' && (
          <ErrorViewImg
            message={`No images for your request ${this.state.imageName}. Go cry...`}
          />
        )}
        {this.state.status === 'resolved' && (
          <Button loadMore={this.loadMore} />
        )}
        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            tags={this.state.tags}
            onClose={this.toggleModal}
          />
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </AppWrap>
    );
  }
}
