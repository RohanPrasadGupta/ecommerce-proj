import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Backdrop, Fade } from "@mui/material";

const DeleteComponent = ({
  title,
  deleteFunction,
  closeModal,
  isModelOpen,
  isCancelOrder = false,
}) => {
  return (
    <Modal
      open={isModelOpen}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isModelOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "white",
            borderRadius: "16px",
            boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
            p: 3,
            outline: "none",
          }}
        >
          <IconButton
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "grey.500",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderRadius: "50%",
                p: 2,
                mb: 2,
              }}
            >
              <DeleteOutlineIcon
                sx={{ fontSize: 40, color: "rgb(239, 68, 68)" }}
              />
            </Box>

            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: 600, mb: 1 }}
            >
              {!isCancelOrder && "Remove"} {title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                justifyContent: "center",
                mt: 1,
              }}
            >
              <Button
                onClick={closeModal}
                variant="outlined"
                sx={{
                  flex: 1,
                  py: 1,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                {isCancelOrder ? "No" : "Cancel"}
              </Button>

              <Button
                onClick={deleteFunction}
                variant="contained"
                sx={{
                  flex: 1,
                  py: 1,
                  bgcolor: "rgb(239, 68, 68)",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: "rgb(220, 38, 38)",
                  },
                }}
              >
                {isCancelOrder ? "Cancel Order" : "Remove"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteComponent;
