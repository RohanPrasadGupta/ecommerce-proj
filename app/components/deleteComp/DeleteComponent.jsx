import React from "react";
import Modal from "@mui/material/Modal";
import { Padding } from "@mui/icons-material";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  background: "#070e18",
  color: "white",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  justifyContent: "center",
  padding: "80px",
};

const DeleteComponent = ({
  title,
  deleteFunction,
  closeModal,
  isModelOpen,
}) => {
  return (
    <Modal
      open={isModelOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={style}>
        <p>Remove {title}?</p>
        <div style={{ display: "flex", gap: "20px" }}>
          <Button onClick={deleteFunction} variant="contained" color="error">
            yes
          </Button>
          <Button onClick={closeModal} variant="contained" color="success">
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteComponent;
