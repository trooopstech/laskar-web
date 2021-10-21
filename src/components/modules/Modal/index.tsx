const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  permanent,
  noBg,
}) => {
  if (open > 0) {
    return (
      <div
        className="fixed h-screen w-screen bg-black bg-opacity-75 flex items-center justify-center top-0 left-0 z-10 shadow-sm"
        onClick={permanent ? undefined : () => onClose()}
      >
        <div
          className={`${noBg ? "" : "bg-gray-modal"} rounded-md z-100`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
