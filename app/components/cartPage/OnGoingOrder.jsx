import React, { useEffect, useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { Box } from "@mui/material";
import CartOrderItemUI from "./CartOrderItemUI";
import EmptyData from "../emptyPageData/EmptyData";

export default function OnGoingOrder() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const userId = user?.id;

  const { data, status, error } = useQuery({
    queryKey: userId ? ["ongoingOrderInfo", userId] : ["ongoingOrderInfo"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://e-combackend-jbal.onrender.com/order?UserId=${userId}`,

          { withCredentials: true }
        );
        return response?.data || [];
      } catch (error) {
        console.error("Error fetching cart data:", error);
        throw new Error("Failed to fetch cart details");
      }
    },
    enabled: !!userId,
  });
  const onGoingCartData = data && data.data ? data.data.orders : [];

  return (
    <div className="flex flex-col bg-gray-50 p-6">
      <Box
        sx={{
          marginBottom: "20px",
          padding: "10px 0",
        }}
      >
        <h1 className="text-2xl font-semibold text-gray-800">Your Orders</h1>
        <p className="text-sm text-gray-500">
          Track and manage your recent orders
        </p>
      </Box>

      <Box sx={{ width: "100%" }}>
        {status === "loading" ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "40px" }}
          >
            <p>Loading your orders...</p>
          </Box>
        ) : onGoingCartData.length > 0 ? (
          onGoingCartData.map((item, index) => (
            <Box
              sx={{
                marginBottom: "24px",
                background: "linear-gradient(to right, #ffffff, #f8f9ff)",
                padding: "16px 24px",
                borderRadius: "16px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                border: "1px solid #eaecf0",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
                },
              }}
              key={index}
            >
              <CartOrderItemUI data={item} />
            </Box>
          ))
        ) : (
          <EmptyData
            windowHeight="50vh"
            text="No orders found. Start shopping!"
          />
        )}
      </Box>
    </div>
  );
}
