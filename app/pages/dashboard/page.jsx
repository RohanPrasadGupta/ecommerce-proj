"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "../page";
import ProductLayout from "../../components/products/ProductLayout";
import styles from "./dashboardStyle.module.scss";
import CatagoryNav from "../../components/catagoryNav/CatagoryNav";
import MuiProductLayout from "../../components/products/MuiProductLayout";
import LoaderComp from "../../components/loadingPage/LoaderComp";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

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

  // const { isPending, error, data } = useQuery({
  //   queryFn: () =>
  //     fetch("https://dummyjson.com/products").then((res) => res.json()),
  // });

  // useEffect(() => {
  //   console.log(isPending, error, data);
  // }, [isPending, error, data]);

  return (
    <MainLayout>
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
    </MainLayout>
  );
}

export default function Page() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PageContent />
    </QueryClientProvider>
  );
}
