"use client";
import React, { useEffect, useState } from "react";
import CartPage from "../../components/cartPage/CartPage";
import ConfirmOrderPage from "../../components/cartPage/ConfirmOrderPage";
import OnGoingOrder from "../../components/cartPage/OnGoingOrder";
import styles from "./cartPageStyle.module.scss";
import EmptyData from "../../components/emptyPageData/EmptyData";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

function page() {
  const [user, setUser] = useState(null);
  const tabs = [
    {
      id: "Cart",
      label: "Cart",
      icon: <ShoppingCartOutlinedIcon fontSize="small" />,
    },
    {
      id: "Ongoing",
      label: "Ongoing",
      icon: <LocalShippingOutlinedIcon fontSize="small" />,
    },
    {
      id: "Confirm",
      label: "Completed",
      icon: <CheckCircleOutlineOutlinedIcon fontSize="small" />,
    },
  ];
  const [activeTab, setActiveTab] = useState("Cart");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (user === null) {
    return <EmptyData text="Please login first." />;
  }

  return (
    <>
      <div className={styles.cartTabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={activeTab === tab.id ? styles.active : styles.btnCart}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.cartMainContainer}>
        {activeTab === "Cart" && <CartPage />}
        {activeTab === "Ongoing" && <OnGoingOrder />}
        {activeTab === "Confirm" && <ConfirmOrderPage />}
      </div>
    </>
  );
}

export default page;
