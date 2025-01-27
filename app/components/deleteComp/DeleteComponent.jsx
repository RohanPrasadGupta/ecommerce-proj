import React from "react";

const DeleteComponent = ({ title, deleteFunction, closeModal }) => {
  return (
    <div>
      <p>Remove {title}?</p>
      <div>
        <button type="button" onClick={deleteFunction}>
          Yes
        </button>
        <button type="button" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteComponent;
