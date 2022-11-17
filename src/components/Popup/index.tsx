export type PopupProps = {
  isOpen: boolean;
  message: string;
  variant: 'bg-success' | 'bg-error';
};

const Popup = ({ message, variant, isOpen }: PopupProps) => {
  return (
    <>
      {isOpen && (
        <div className={`popup-wrapper ${variant}`}>
          <h4 className='popup'>{message}</h4>
        </div>
      )}
    </>
  );
};

export default Popup;
