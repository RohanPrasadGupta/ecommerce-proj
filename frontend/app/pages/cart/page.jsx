"use client";
import React from "react";
import MainLayout from "../page";
import CartPage from "@/app/components/cartPage/CartPage";

function page() {
  return (
    <MainLayout>
      <CartPage />
    </MainLayout>
  );
}

export default page;
