import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './styles.module.css';

const Modal = ({ onClose, children }) => {
  

  const handlBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handlKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handlKeyDown);
    return () => {
      window.removeEventListener('keydown', handlKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={css.Overlay} onClick={handlBackDropClick}>
      <div className={css.Modal}>{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default Modal;

// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import css from './styles.module.css';

// const modalRoot = document.querySelector('#modal-root');

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handlKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handlKeyDown);
//   }

//   handlKeyDown = e => {
//     console.log(e.code);
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handlBackDropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={css.Overlay} onClick={this.handlBackDropClick}>
//         <div className={css.Modal}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
