import { Box } from "@mui/system";
import React from "react";
import GlobalButton from "../Buttons/GlobalButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const CartOrderItemUI = ({ data }) => {
  const queryClient = useQueryClient();

  const productItems = data?.products;
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const cancelMutation = useMutation({
    mutationFn: (item) =>
      axios.delete(`http://localhost:3001/order?orderId=${data._id}`, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ongoingOrderInfo"] });
      toast.success("Order cancelled successfully");
    },
    onError: (error) => {
      toast.error("Order cancellation failed! Please try again.");
      console.error("Error cancelling order:", error);
    },
  });

  const handleCancelOrder = async (data) => {
    cancelMutation.mutate();
  };

  return (
    <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
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
          Date: {data?.date ? formatDate(data.date) : "N/A"}
        </Box>
        {!data.isCanceled && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <GlobalButton
              type="button"
              onClick={() => handleCancelOrder(data)}
              text="Cancel Order"
              theme="outline"
              width="fit-content"
              height="40px"
              icon={<CloseOutlinedIcon fontSize="small" />}
            />
          </Box>
        )}
      </Box>
      <Box>
        {productItems?.map((product, index) => (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 150px 100px 100px 150px ",
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
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CartOrderItemUI;
