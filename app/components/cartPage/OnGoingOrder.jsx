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
    <div className="flex flex-col md:flex-row bg-gray-100 p-6 ">
      <Box sx={{ width: "100%" }}>
        {onGoingCartData.length > 0 ? (
          onGoingCartData.map((item, index) => (
            <Box
              sx={{
                marginBottom: "20px",
                background: "#f4bcff",
                padding: "10px 20px",
                borderRadius: "12px",
                boxShadow:
                  "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)",
              }}
              key={index}
            >
              <CartOrderItemUI data={item} />
            </Box>
          ))
        ) : (
          <EmptyData windowHeight="50vh" text="No data found." />
        )}
      </Box>
    </div>
  );
}
