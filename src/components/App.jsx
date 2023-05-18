import React, {  useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import css from './styles.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  
  const handleSearchSubmit = search => {
    setSearch(search);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} />

      <ImageGallery search={search} />
    </div>
  );
};

// class App extends Component {
//   state = {
//     search: '',
//     showModal: false,

//   };

// handleSearchSubmit = search => {
//   this.setState({ search: search, images: [] });
// };

//   render() {
//     const { search } = this.state;
//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={this.handleSearchSubmit} />

//         <ImageGallery
//   search={search}

// />
//       </div>
//     );
//   }
// }

export default App;
