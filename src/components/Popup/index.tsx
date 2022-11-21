// Lib
import { useState } from 'react';

export type PopupProps = {
  isOpen: boolean;
  message: string;
  variant: 'bg-success' | 'bg-error';
};

const Popup = ({ message, variant, isOpen }: PopupProps) => {
  const [isOpenPopup, setIsOpenPopup] = useState(isOpen);

  setTimeout(() => {
    setIsOpenPopup(false);
  }, 3000);

  return (
    <>
      {isOpenPopup && (
        <div className={`popup-wrapper ${variant}`}>
          <h4 className='popup'>{message}</h4>
        </div>
      )}
    </>
  );
};

export default Popup;
