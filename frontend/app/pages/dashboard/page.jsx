"use client";
import React, { useState } from "react";
import MainLayout from "../page";
import AllProduct from "@/app/services/dataFetch";
import ProductLayout from "@/app/components/products/ProductLayout";

function page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // AllProduct().then((res) => {
  //   setData(res);
  //   setLoading(false);
  // });

  // if (loading) {
  //   return (
  //     <MainLayout>
  //       <div>Loading....</div>
  //     </MainLayout>
  //   );
  // }

  return (
    <MainLayout>
      <div>Dashboard page</div>
      <ProductLayout />
    </MainLayout>
  );
}

export default page;
