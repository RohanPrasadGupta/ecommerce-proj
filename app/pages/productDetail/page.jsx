import React from "react";
import ProductDetail from "../../components/productDetail/ProductDetail";
import LoaderComp from "../../components/loadingPage/LoaderComp";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<LoaderComp />}>
      <ProductDetail />
    </Suspense>
  );
}

export default Page;
