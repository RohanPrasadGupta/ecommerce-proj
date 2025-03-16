"use client";
import React, { useEffect, useState } from "react";
import CartPage from "../../components/cartPage/CartPage";
import ConfirmOrderPage from "../../components/cartPage/ConfirmOrderPage";
import OnGoingOrder from "../../components/cartPage/OnGoingOrder";
import styles from "./cartPageStyle.module.scss";
import EmptyData from "../../components/emptyPageData/EmptyData";

function page() {
  const [user, setUser] = useState(null);
  const tabs = ["Cart", "Ongoin", "Confirm"];
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
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={activeTab === tab ? styles.active : styles.btnCart}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {activeTab === "Cart" && <CartPage />}
        {activeTab === "Ongoin" && <OnGoingOrder />}
        {activeTab === "Confirm" && <ConfirmOrderPage />}
      </div>
    </>
  );
}

export default page;
