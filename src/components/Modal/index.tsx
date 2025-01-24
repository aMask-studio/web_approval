import React, { CSSProperties, MouseEventHandler } from 'react';
import Button from '../Button';
import './style.scss';

interface Props {
    children: JSX.Element,
    button_open: JSX.Element,
    style?: CSSProperties | undefined,
}

const Modal = ({ children, button_open, style }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <a style={style}>
      <div onClick={(e) => {e.stopPropagation();setIsOpen(!isOpen);}}>
        {button_open}
      </div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            {children}
            <Button onClick={() => setIsOpen(false)}><p>Закрыть</p></Button>
          </div>
        </div>
      )}
    </a>
  );
};

export default Modal;
