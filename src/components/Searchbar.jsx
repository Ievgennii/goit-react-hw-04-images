// import React, { useState } from 'react';
// import css from './styles.module.css';
// import { ImSearch } from 'react-icons/im';

// const Searchbar = ({ onSubmit, onPageChange }) => { // Добавлен `onPageChange`
//   const [search, setSearch] = useState('');

//   const handleSearchChange = event => {
//     setSearch(event.currentTarget.value.toLowerCase());
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     if (search.trim() === '') {
//       alert('Введите запрос');
//       return;
//     }

//     onSubmit(search);
//     onPageChange(1); // Передача значения 1 при сабмите
//     setSearch('');
//   };

//   return (
//     <header className={css.Searchbar}>
//       <form onSubmit={handleSubmit} className={css.SearchForm}>
//         <button type="submit" className={css.SearchFormButton}>
//           <span>
//             <ImSearch />
//           </span>
//         </button>

//         <input
//           className={css.SearchFormInput}
//           type="text"
//           name="request"
//           value={search}
//           onChange={handleSearchChange}
//           placeholder="Search images and photos"
//         />
//       </form>
//     </header>
//   );
// };

// export default Searchbar;


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import React, { useState} from 'react';
import css from './styles.module.css';
import { ImSearch } from 'react-icons/im';

const Searchbar = ({onSubmit}) => {
  const [search, setSearch] = useState('');

  const handlSearchChange = event => {
    setSearch(event.currentTarget.value.toLowerCase());
  };

  const handlSubmit = event => {
    event.preventDefault();
    if (search.trim() === '') {
      alert('Введите запрос');
      return;
    }

    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handlSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span>
            <ImSearch />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="request"
          value={search}
          onChange={handlSearchChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// class Searchbar extends Component {
//   state = {
//     search: '',
//   };

// handlSearchChange = event => {
//   this.setState({ search: event.currentTarget.value.toLowerCase() });
// };

// handlSubmit = event => {
//   event.preventDefault();
//   if (this.state.search.trim() === '') {
//     alert('Введите запрос');
//     return;
//   }

//   this.props.onSubmit(this.state.search);
//   this.setState({ search: '' });
// };

//   render() {
//     return (
// <header className={css.Searchbar}>
//   <form onSubmit={this.handlSubmit} className={css.SearchForm}>
//     <button type="submit" className={css.SearchFormButton}>
//       <span>
//         <ImSearch />
//       </span>
//     </button>

//     <input
//       className={css.SearchFormInput}
//       type="text"
//       name="request"
//       value={this.state.search}
//       onChange={this.handlSearchChange}
//       placeholder="Search images and photos"
//     />
//   </form>
// </header>
//     );
//   }
// }

export default Searchbar;
