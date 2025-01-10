import React from "react";
import MainLayout from "../page";
import ProductDetail from "@/app/components/productDetail/ProductDetail";

function page() {
  return (
    <MainLayout>
      <ProductDetail />
    </MainLayout>
  );
}

export default page;
