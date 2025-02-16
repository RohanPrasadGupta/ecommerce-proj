"use client";
import React, { useState, useEffect } from "react";
import styles from "./dashboardStyle.module.scss";
import CatagoryNav from "../../components/catagoryNav/CatagoryNav";
import MuiProductLayout from "../../components/products/MuiProductLayout";
import LoaderComp from "../../components/loadingPage/LoaderComp";
import { useQuery } from "@tanstack/react-query";
import Layout from "../page";

function PageContent() {
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

  // const fetchProducts = async () => {
  //   const response = await fetch(
  //     "https://e-combackend-jbal.onrender.com/getAllProducts",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   if (!response.ok) {
  //     throw new Error("Failed to fetch products.");
  //   }
  //   return response.json();
  // };

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: fetchProducts,
  // });

  // useEffect(() => {
  //   console.log("data, isLoading, isError", data, isLoading, isError);
  // }, [data, isLoading, isError]);

  return (
    <Layout>
      {loading ? (
        <LoaderComp />
      ) : (
        <>
          <CatagoryNav setSelectCategory={setNewSelectCategory} />
          <div className={styles.mainProducts}>
            {newData.map((product) => (
              <MuiProductLayout key={product.id} data={product} />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}

export default PageContent;
