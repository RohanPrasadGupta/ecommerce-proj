"use client";
import React, { useState, useEffect } from "react";
import ProductLayout from "../../components/products/ProductLayout";
import styles from "./dashboardStyle.module.scss";
import CatagoryNav from "../../components/catagoryNav/CatagoryNav";
import MuiProductLayout from "../../components/products/MuiProductLayout";
import LoaderComp from "../../components/loadingPage/LoaderComp";
import { useQuery } from "@tanstack/react-query";

function PageContent() {
  const [newData, setNewData] = useState([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: async () => {
      const response = await fetch(
        "https://e-combackend-jbal.onrender.com/getAllProducts"
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  useEffect(() => {
    if (data?.data?.products) {
      setNewData(data.data.products);
    }
    // console.log(
    //   "isPending, error, data",
    //   isPending,
    //   error,
    //   data?.data?.products
    // );
  }, [isPending, error, data]);

  return (
    <>
      {isPending ? (
        <LoaderComp />
      ) : (
        <>
          {/* <CatagoryNav setSelectCategory={setNewSelectCategory} /> */}
          <div className={styles.mainProducts}>
            {newData.map((product) => (
              <MuiProductLayout key={product._id} data={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function Page() {
  return <PageContent />;
}
