import React, { useState, useEffect } from 'react';
// import React, { Component } from 'react';
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
    const fetchData1 = async () => {
      if (page !== 1) {
        setIsLoading(true);
        console.log(`page ${page}`);
        try {
          const result = await getImagesWithQuery(search, page);
          const { hits } = result;
          // console.log('_____________________________________');
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
  }, [search, page]);

  useEffect(() => {
    setPage(1);
    // console.log(page)
    const fetchData = async () => {
      if (!search) {
        return;
      }
      setIsLoading(true);

      try {
        const result = await getImagesWithQuery(search, 1);
        setTimeout(() => {
          const { hits, totalHits } = result;
          setImages(hits);
          setTotalHits(totalHits);
          // console.log('++++++++++++++++++++++++++++++++');
          // setPage(1);
          if (hits.length === 0) {
            alert("We're sorry, but we didn't find anything for your request.");
          }
        }, 200);
      } catch (error) {
        setError(error);
        alert(`Whoops, something went wrong: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

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
