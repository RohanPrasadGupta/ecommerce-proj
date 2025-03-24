import { Box } from "@mui/system";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import DeleteComponent from "../deleteComp/DeleteComponent";

const CartOrderItemUI = ({ data }) => {
  const queryClient = useQueryClient();
  const [isModelOpen, setIsModelOpen] = useState(false);

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
      axios.delete(
        `https://e-combackend-jbal.onrender.com/order?orderId=${data._id}`,
        {
          withCredentials: true,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ongoingOrderInfo"] });
      toast.success("Order cancelled successfully");
    },
    onError: (error) => {
      toast.error("Order cancellation failed! Please try again.");
      console.error("Error cancelling order:", error);
    },
  });

  const itemsAmount = data?.products
    ?.map((product) => product?.orderedPrice)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  const handleCancelOrder = async (data) => {
    cancelMutation.mutate();
  };

  return (
    <>
      {isModelOpen && (
        <DeleteComponent
          title="Cancel Order"
          isModelOpen={isModelOpen}
          isCancelOrder={true}
          deleteFunction={() => {
            handleCancelOrder(data);
            // dispatch(removeItem(deleteItem));
            setIsModelOpen(false);
          }}
          closeModal={() => {
            setIsModelOpen(false);
          }}
        />
      )}

      <Box sx={{ display: "flex", gap: "16px", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #eaecf0",
            paddingBottom: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(249, 250, 251, 0.8)",
              padding: "8px 16px",
              borderRadius: "12px",
              width: "max-content",
              fontSize: "14px",
              fontWeight: "600",
              color: "#4B5563",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <span style={{ marginRight: "6px", opacity: 0.7 }}>Ordered:</span>
            {data?.date ? formatDate(data.date) : "N/A"}
          </Box>
          {!data.isCanceled && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <GlobalButton
                type="button"
                onClick={() => {
                  setIsModelOpen(true);
                  // handleCancelOrder(data)
                }}
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
          <Box
            sx={{
              marginBottom: "8px",
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr",
              paddingLeft: "20px",
              paddingRight: "20px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#6B7280",
              "@media (max-width: 768px)": {
                display: "none",
              },
            }}
          >
            <Box sx={{ textAlign: "center" }}>Item</Box>
            <Box>Product</Box>
            <Box sx={{ textAlign: "center" }}>Status</Box>
            <Box sx={{ textAlign: "center" }}>Price</Box>
            <Box sx={{ textAlign: "center" }}>Qty</Box>
            <Box sx={{ textAlign: "center" }}>Total</Box>
          </Box>

          {productItems?.map((product, index) => (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr",
                alignItems: "center",
                gap: "16px",
                width: "100%",
                background: "white",
                padding: "16px 20px",
                borderRadius: "16px",
                marginBottom: "8px",
                transition: "transform 0.2s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transform: "translateY(-2px)",
                },
                "@media (max-width: 768px)": {
                  gridTemplateColumns: "1fr",
                  gap: "10px",
                  textAlign: "center",
                  padding: "16px",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
              key={index}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={product?.product?.thumbnail}
                  alt={product?.product?.title}
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "150px",
                }}
              >
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "15px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginBottom: "4px",
                  }}
                >
                  {product?.product?.title}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#6B7280",
                    fontWeight: "500",
                  }}
                >
                  {product?.product?.brand}
                </span>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "13px",
                    backgroundImage: (() => {
                      const status =
                        product?.status ||
                        product?.product?.status ||
                        "unknown";

                      switch (status.toLowerCase()) {
                        case "pending":
                          return "linear-gradient(135deg, #ffa500, #ff8c00)";
                        case "dispatched":
                          return "linear-gradient(135deg, #2196f3, #1976d2)";
                        case "delivered":
                          return "linear-gradient(135deg, #08a908, #078e07)";
                        case "cancelled":
                        case "canceled":
                          return "linear-gradient(135deg, #f44336, #d32f2f)";
                        default:
                          return "linear-gradient(135deg, #9e9e9e, #757575)";
                      }
                    })(),
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    minWidth: "100px",
                    width: "max-content",
                    fontWeight: "600",
                    textTransform: "capitalize",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  {product?.status || product?.product?.status || "Unknown"}
                </Box>
              </Box>

              <Box
                sx={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#374151",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                ${product?.product?.price}
              </Box>

              <Box
                sx={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#374151",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {product?.quantity}
              </Box>

              <Box
                sx={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#111827",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                ${product?.orderedPrice}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            marginTop: "8px",
            "@media (max-width: 768px)": {
              flexDirection: "column",
              gap: "20px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flex: 1,
              borderRadius: "12px",
              padding: "16px",
              backgroundColor: "rgba(249, 250, 251, 0.6)",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "17px",
                color: "#111827",
                fontWeight: "600",
              }}
            >
              Shipping Details
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: "8px",
                fontSize: "14px",
              }}
            >
              <span style={{ fontWeight: "600", color: "#4B5563" }}>
                Address:
              </span>
              <span style={{ fontWeight: "400", color: "#111827" }}>
                {data?.address || "N/A"}
              </span>

              <span style={{ fontWeight: "600", color: "#4B5563" }}>
                Phone:
              </span>
              <span style={{ fontWeight: "400", color: "#111827" }}>
                {data?.phoneNumber || "N/A"}
              </span>

              <span style={{ fontWeight: "600", color: "#4B5563" }}>Name:</span>
              <span style={{ fontWeight: "400", color: "#111827" }}>
                {data?.name || "N/A"}
              </span>

              <span style={{ fontWeight: "600", color: "#4B5563" }}>
                Payment:
              </span>
              <span style={{ fontWeight: "400", color: "#111827" }}>COD</span>
            </div>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              minWidth: "220px",
              padding: "16px",
              backgroundColor: "rgba(243, 244, 246, 0.7)",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "17px",
                color: "#111827",
                fontWeight: "600",
              }}
            >
              Order Summary
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                gap: "8px",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontWeight: "500",
                  color: "#4B5563",
                  fontSize: "14px",
                }}
              >
                SubTotal ({data?.products.length}):
              </span>
              <span
                style={{
                  fontWeight: "600",
                  textAlign: "right",
                  fontSize: "14px",
                  color: "#111827",
                }}
              >
                ${itemsAmount || "N/A"}
              </span>

              <span
                style={{
                  fontWeight: "500",
                  color: "#4B5563",
                  fontSize: "14px",
                }}
              >
                Shipping:
              </span>
              <span
                style={{
                  fontWeight: "600",
                  textAlign: "right",
                  fontSize: "14px",
                  color: "#111827",
                }}
              >
                ${data?.shippingFee || "N/A"}
              </span>

              <Box
                sx={{
                  height: "1px",
                  backgroundColor: "#e5e7eb",
                  gridColumn: "1 / -1",
                  margin: "8px 0",
                }}
              />

              <span
                style={{
                  fontWeight: "700",
                  fontSize: "16px",
                  color: "#111827",
                }}
              >
                Total:
              </span>
              <span
                style={{
                  fontWeight: "700",
                  textAlign: "right",
                  fontSize: "16px",
                  color: "#111827",
                }}
              >
                ${data?.totalAmount?.toFixed(2) || "N/A"}
              </span>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CartOrderItemUI;
