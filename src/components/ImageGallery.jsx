import React, { useState, useEffect } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import { MagnifyingGlass } from 'react-loader-spinner';
import { getImagesWithQuery } from './Api';
import css from './styles.module.css';
import Modal from './Modal';

const ImageGallery = ({ search }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  
 

  useEffect(() => {
    setPage(1)
    // console.log(page)
    const fetchData = async () => {
      if (!search) {
        return;
      }
      setIsLoading(true);

      try {
        const result = await getImagesWithQuery(search, 1);
        const { hits, totalHits } = result;

        setImages(hits);
        setTotalHits(totalHits);
        console.log('++++++++++++++++++++++++++++++++');
        // setPage(1);
        if (hits.length === 0) {
          setTimeout(() => {
            alert("We're sorry, but we didn't find anything for your request.");
          }, 200);
        }
      } catch (error) {
        setError(error);
        alert(`Whoops, something went wrong: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);



  useEffect(() => {
    
    const fetchData1 = async () => {
      
      if (page !== 1) {
        setIsLoading(true);
        console.log(page);
        try {
          const result = await getImagesWithQuery(search, page);
          const { hits } = result;
          console.log('_____________________________________');
          setImages(prevImages => [...prevImages, ...hits]);
        } catch (error) {
          setError(error);
          alert(`Whoops, something went wrong: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData1();
  }, [page]);

  const changePage = () => {
    if (images.length > 0) {
      setPage(prevPage => prevPage + 1);
    }
    setTotalHits(prevTotalHits => prevTotalHits - 12);

    if (totalHits < 24) {
      setTimeout(() => {
        alert("We're sorry, but you've reached the end of search results.");
      }, 1000);
    }
  };

  const handleImageClick = largeImageURL => {
    setSelectedImage(largeImageURL);
  };

  return (
    <div>
      <ul className={css.ImageGallery}>
        {isLoading && <MagnifyingGlass />}
        {images.length > 0 && (
          <ImageGalleryItem images={images} onImageClick={handleImageClick} />
        )}
      </ul>
      <div className={css.ButtonConteiner}>
        {!error && totalHits > 12 && <Button changePage={changePage} />}
      </div>
      {selectedImage && (
        <Modal onClose={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default ImageGallery;

// class ImageGallery extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     error: null,
//     page: 1,
//     search: '',
//     selectedImage: null,
//     totalHits: null,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     if (prevProps.search !== this.props.search) {
//       this.setState({ isLoading: true });
//       this.setState({ search: this.props.search });

//       try {
//         const images = await getImagesWithQuery(this.props.search, 1);

//         this.setState({
//           images: images.hits,
//           emptyResponce: !images.hits.length,
//           totalHits: images.totalHits,
//         });
//       } catch (error) {
//         this.setState({ error });
//         alert(`Whoops, something went wrong: ${error.message}`);
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }

//     if (prevState.page !== this.state.page && this.state.page !== 1) {
//       this.setState({ isLoading: true });
//       this.setState({ search: this.props.search });

//       try {
//         const images = await getImagesWithQuery(
//           this.props.search,
//           this.state.page
//         );
//         this.setState(prevState => ({
//           images: [...prevState.images, ...images.hits],
//         }));
//       } catch (error) {
//         this.setState({ error });
//         alert("We're sorry, but you've reached the end of search results.");
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   changePage = () => {
//     if (this.state.images.length > 0) {
//       this.setState(prevState => ({
//         page: prevState.page + 1,
//       }));
//     }
//     this.setState(prevState => ({
//       totalHits: prevState.totalHits - 12,
//     }));

//     if (this.state.totalHits < 24) {
//       setTimeout(() => {
//         alert("We're sorry, but you've reached the end of search results.");
//       }, 1000);
//     }
//   };

//   handleImageClick = largeImageURL => {
//     this.setState({ selectedImage: largeImageURL });
//   };

//   render() {
//     const {
//       images,
//       isLoading,
//       error,
//       emptyResponce,
//       selectedImage,
//       totalHits,
//     } = this.state;

//     return (
//       <div>
//         <ul className={css.ImageGallery}>
//           {isLoading && <MagnifyingGlass />}
//           {emptyResponce && (
//             <p>We're sorry, but we didn't find anything for your request.</p>
//           )}

//           {images.length > 0 && (
//             <ImageGalleryItem
//               images={images}
//               onImageClick={this.handleImageClick}
//             />
//           )}
//         </ul>
//         <div className={css.ButtonConteiner}>
//           {!error && totalHits > 12 && <Button changePage={this.changePage} />}
//         </div>
//         {selectedImage && (
//           <Modal onClose={() => this.setState({ selectedImage: null })}>
//             <img src={selectedImage} alt="" />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }
