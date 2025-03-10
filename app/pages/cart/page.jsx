"use client";
import React, { useEffect, useState } from "react";
import CartPage from "../../components/cartPage/CartPage";
import ConfirmOrderPage from "../../components/cartPage/ConfirmOrderPage";
import OnGoingOrder from "../../components/cartPage/OnGoingOrder";
import styles from "./cartPageStyle.module.scss";

function page() {
  const tabs = ["Cart", "Ongoin", "Confirm"];
  const [activeTab, setActiveTab] = useState("Cart");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    console.log("activeTab", activeTab);
  }, [activeTab]);

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
