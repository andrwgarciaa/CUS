const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`modal ${
        isOpen ? "block" : "hidden"
      } w-full h-full absolute top-0 left-0 flex justify-center items-center`}
    >
      <div
        className="modal-background bg-black opacity-30 w-full h-full absolute top-0 left-0"
        onClick={onClose}
      ></div>
      <div className="modal-content border rounded-lg bg-white w-2/5 h-5/6 z-40 flex flex-col items-center justify-start p-4 gap-4">
        {children}
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      >
        CLOSE
      </button>
    </div>
  );
};

export default Modal;
