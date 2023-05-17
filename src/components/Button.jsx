import React from 'react';
import css from './styles.module.css';

const Button = ({ changePage }) => (
  <div>
    <button type="button" className={css.Button} onClick={changePage}>
      Load more
    </button>
  </div>
);

export default Button;
