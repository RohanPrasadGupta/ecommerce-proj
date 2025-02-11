"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import styles from "./productDetails.module.scss";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoBagHandleSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../redux/storeSlice/cartSlice";
import toast from "react-hot-toast";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ReviewLayout from "../review/ReviewLayout";
import Rating from "@mui/material/Rating";

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemQuantity, setItemQuantity] = useState(1);
  const dispatch = useDispatch();

  const productId = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://dummyjson.com/products/${productId}`);
      const res = await data.json();
      // console.log(res);
      setProductData(res);
      setLoading(false);
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return <div>Loading....</div>;
  }

  const givenPrice =
    productData.price -
    (productData.price * productData.discountPercentage) / 100;

  const handleAddTOCart = () => {
    try {
      dispatch(
        addItem({
          ...productData,
          price: productData.discount ? givenPrice : productData.price,
          quantity: itemQuantity,
          isAvaiable: true,
        })
      );
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Unable to add item to cart");
    }
  };

  return (
    <>
      <div className={styles.mainLayout}>
        <div className={styles.imageLayout}>
          <img src={productData?.thumbnail} alt="Image" />
        </div>
        <div className={styles.descLayout}>
          <p>{productData?.title}</p>

          <div className={styles.priceLayout}>
            {productData.discountPercentage && (
              <p className={styles.orgPrice}>{productData.price.toFixed(2)}</p>
            )}

            <p className={styles.getPrice}>
              <span>$</span>
              {productData.discountPercentage
                ? givenPrice.toFixed(2)
                : productData.price.toFixed(2)}
            </p>
            {productData.discountPercentage && (
              <p className={styles.discountLayout}>
                <span className={styles.discountTag}>
                  {productData.discountPercentage}%
                </span>
                <span>Off</span>
              </p>
            )}
          </div>

          <div className={styles.specificationLayout}>
            <p>
              Brand: <span>{productData?.brand}</span>
            </p>
            <p>
              Category: <span>{productData?.category}</span>
            </p>
            <p>
              Return Policy:{" "}
              <span>{productData?.returnPolicy || " No Return"}</span>
            </p>
            <p>
              In Stock: <span>{productData?.stock || "No Stock"}</span>
            </p>
            <p>
              Warranty Information:{" "}
              <span>{productData?.warrantyInformation || "No Warranty"}</span>
            </p>
          </div>
          <p className={styles.description}>{productData?.description}</p>

          <div className={styles.quantityLayout}>
            <button
              onClick={() => {
                itemQuantity < productData.stock &&
                  setItemQuantity(itemQuantity + 1);
              }}
            >
              <AddCircleOutlineIcon
                fontSize="large"
                sx={{
                  color: "black",
                  fontWeight: "normal",
                  "&:hover": {
                    scale: 1.1,
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              />
            </button>
            <p className={styles.quantityStyle}>{itemQuantity}</p>
            <button
              onClick={() => {
                if (itemQuantity > 1) setItemQuantity(itemQuantity - 1);
              }}
            >
              <RemoveCircleOutlineIcon
                fontSize="large"
                sx={{
                  color: "black",
                  fontWeight: "normal",
                  "&:hover": {
                    scale: 1.1,
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              />
            </button>
            <button onClick={handleAddTOCart} className={styles.cartButton}>
              <IoBagHandleSharp />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div style={{ padding: "0px 30px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            Reviews: ({productData?.reviews.length})
          </p>
          <Rating
            name="half-rating"
            defaultValue={Math.floor(productData?.rating)}
            precision={0.5}
            readOnly
          />
          {productData?.rating}
        </div>
        {productData?.reviews ? (
          productData?.reviews.map((review, index) => (
            <ReviewLayout key={index} data={review} />
          ))
        ) : (
          <div>No Reviews</div>
        )}
      </div>
    </>
  );
}

// export default ProductDetail;

export default function ProductDetail() {
  return (
    <Suspense fallback={<div>Loading Product Details...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
