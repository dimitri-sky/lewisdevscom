import React from "react";

const Modal = ({ title, children, isOpen, setIsOpen, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    setIsOpen(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {children}
          <button type="submit">Submit</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
