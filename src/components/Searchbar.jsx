import React, { Component } from 'react';
import css from './styles.module.css';
import { ImSearch } from 'react-icons/im';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handlSearchChange = event => {
    this.setState({ search: event.currentTarget.value.toLowerCase() });
  };

  handlSubmit = event => {
    event.preventDefault();
    if (this.state.search.trim() === '') {
      alert('Введите запрос');
      return;
    }

    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handlSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span>
              <ImSearch />
            </span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            name="request"
            value={this.state.search}
            onChange={this.handlSearchChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
