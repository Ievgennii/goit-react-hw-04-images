import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import { MagnifyingGlass } from 'react-loader-spinner';
import { getImagesWithQuery } from './Api';
import css from './styles.module.css';
import Modal from './Modal';

class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    search: '',
    emptyResponse: false,
    selectedImage: null,
    totalHits: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.search !== this.props.search) {
      this.setState({ isLoading: true });
      this.setState({ search: this.props.search });
      this.setState({ page: 1 });
      this.setState({ error: null });

      try {
        const images = await getImagesWithQuery(this.props.search, 1);
        // this.setState(prevState => ({
        //   images: [...prevState.images, images.hits]
        // }));
        this.setState({
          images: images.hits,
          emptyResponce: !images.hits.length,
        });
        this.setState({
          totalHits: images.totalHits,
        });

        console.log(images.totalHits);
        console.log(images.hits);
      } catch (error) {
        this.setState({ error });
        alert(`Whoops, something went wrong: ${error.message}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ isLoading: true });
      this.setState({ search: this.props.search });

      try {
        const images = await getImagesWithQuery(
          this.props.search,
          this.state.page
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
        }));

        // this.setState(prevState => ({
        //   totalHits: prevState.totalHits - 12,
        // }));
        // if (this.state.totalHits < 24 && this.state.images.length > 0) {
        //   alert("We're sorry, but you've reached the end of search results.");
        // }
        console.log(this.state.images);
        console.log(this.state.totalHits);
        // this.setState({ images: images.hits });
      } catch (error) {
        this.setState({ error });
        alert("We're sorry, but you've reached the end of search results.");
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  changePage = () => {
    if (this.state.images.length > 0) {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }));
      
    }
    this.setState(prevState => ({
      totalHits: prevState.totalHits - 12,
    }));
    
    if (this.state.totalHits < 24 ) {
      setTimeout(() => {
        alert("We're sorry, but you've reached the end of search results.");
      }, 1000);
      // alert("We're sorry, but you've reached the end of search results.");
    }
  };

  handleImageClick = largeImageURL => {
    this.setState({ selectedImage: largeImageURL });
  };

  render() {
    const {
      images,
      isLoading,
      error,
      emptyResponce,
      selectedImage,
      totalHits,
    } = this.state;

    return (
      <div>
        <ul className={css.ImageGallery}>
          {isLoading && <MagnifyingGlass />}
          {emptyResponce && (
            <p>We're sorry, but we didn't find anything for your request.</p>
          )}

          {images.length > 0 && (
            <ImageGalleryItem
              images={images}
              onImageClick={this.handleImageClick}
            />
          )}
        </ul>
        <div className={css.ButtonConteiner}>
          {!error && totalHits > 12 && <Button changePage={this.changePage} />}
        </div>
        {selectedImage && (
          <Modal onClose={() => this.setState({ selectedImage: null })}>
            <img src={selectedImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default ImageGallery;
