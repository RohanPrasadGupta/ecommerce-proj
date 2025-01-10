"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "../page";
import AllProduct from "@/app/services/dataFetch";
import ProductLayout from "@/app/components/products/ProductLayout";
import styles from "./dashboardStyle.module.scss";
import CatagoryNav from "@/app/components/catagoryNav/CatagoryNav";
import ProductDetail from "@/app/components/productDetail/ProductDetail";

function Page() {
  const [selectCategory, setSelectCategory] = useState("all");
  const [data, setData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiCategory = `/category?type=${selectCategory}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchApi = `https://fakestoreapi.in/api/products`;
        const products = await fetch(
          selectCategory === "all" ? fetchApi : `${fetchApi}${apiCategory}`
        );
        const res = await products.json();
        setData(res?.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectCategory]);

  if (loading) {
    return (
      <MainLayout>
        <div>Loading....</div>
      </MainLayout>
    );
  }

  console.log(selectCategory);

  return (
    <MainLayout>
      {selectedProductId !== null ? (
        <ProductDetail />
      ) : (
        <>
          <div>Dashboard page</div>

          <CatagoryNav setSelectCategory={setSelectCategory} />

          <div className={styles.mainProducts}>
            {data.map((product) => {
              return (
                <div key={product.id}>
                  <ProductLayout
                    setSelectedProductId={setSelectedProductId}
                    data={product}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default Page;
