"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "../page";
import ProductLayout from "../../components/products/ProductLayout";
import styles from "./dashboardStyle.module.scss";
import CatagoryNav from "../../components/catagoryNav/CatagoryNav";
import ProductDetail from "../../components/productDetail/ProductDetail";
import MuiProductLayout from "../../components/products/MuiProductLayout";
import LoaderComp from "../../components/loadingPage/LoaderComp";

function Page() {
  const [newSelectCategory, setNewSelectCategory] = useState("");
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchApi = `https://dummyjson.com/products`;
        const products = await fetch(
          newSelectCategory
            ? `${fetchApi}/category/${newSelectCategory}`
            : fetchApi
        );
        const res = await products.json();
        setNewData(res.products || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [newSelectCategory]);

  if (loading) {
    return (
      <MainLayout>
        <LoaderComp />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <CatagoryNav setSelectCategory={setNewSelectCategory} />
      <div className={styles.mainProducts}>
        {newData.map((product) => (
          <MuiProductLayout key={product.id} data={product} />
        ))}
      </div>
    </MainLayout>
  );
}

export default Page;
