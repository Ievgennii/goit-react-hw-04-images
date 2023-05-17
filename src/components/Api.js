import axios from 'axios';

export const getImagesWithQuery = async (search, page) => {
  const KEY = '34611977-1c6ac37fcf885911789ad5cb9';

  const response = await axios.get(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
