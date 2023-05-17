import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';


import css from './styles.module.css';

class App extends Component {
  state = {
    search: '',
    showModal: false,
    // images: [],
    // page: 1,
    
  };

  handleSearchSubmit = search => {
    this.setState({ search: search, images: [], page: 1 });
  };

  
  render() {
    const { search } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        
        <ImageGallery
  search={search} 
  
/>
      </div>
    );
  }
}

export default App;
