import { Box } from "@mui/system";
import React from "react";
import GlobalButton from "../Buttons/GlobalButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const CartOrderItemUI = ({ data }) => {
  const productItems = data?.products;

  return (
    <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          padding: "5px 20px",
          borderRadius: "24px",
          width: "max-content",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        Date: {data?.date}
      </Box>
      <Box>
        {productItems?.map((product, index) => (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 120px 80px 80px 100px 150px",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              background: "white",
              padding: "10px 20px",
              borderRadius: "24px",
              marginBottom: "5px",
              "@media (max-width: 768px)": {
                gridTemplateColumns: "1fr",
                gap: "5px",
                textAlign: "center",
                padding: "10px",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
            key={index}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={product?.product?.thumbnail}
                alt={product?.product?.title}
                className="w-16 h-16 rounded-md"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "150px",
              }}
            >
              <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                {product?.product?.title}
              </span>
              <span style={{ fontSize: "14px", color: "#666" }}>
                {product?.product?.brand}
              </span>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                backgroundColor:
                  product?.status === "pending" ? "#ffa500" : "#08a908",
                color: "white",
                padding: "5px 10px",
                borderRadius: "12px",
                minWidth: "100px",
                width: "max-content",
                "@media (max-width: 768px)": {
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                },
              }}
            >
              {product?.status === "pending" ? "Pending" : "Delivered"}
            </Box>

            <Box
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "center",
                minWidth: "80px",
              }}
            >
              ${product?.product?.price}
            </Box>

            <Box
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "center",
                minWidth: "80px",
              }}
            >
              {product?.quantity}
            </Box>

            <Box
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "center",
                minWidth: "100px",
              }}
            >
              ${product?.orderedPrice}
            </Box>

            {product?.status === "pending" && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <GlobalButton
                  type="button"
                  text="Cancel"
                  theme="outline"
                  width="fit-content"
                  height="40px"
                  icon={<CloseOutlinedIcon fontSize="small" />}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CartOrderItemUI;
