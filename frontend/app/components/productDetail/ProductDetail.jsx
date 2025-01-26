"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./productDetails.module.scss";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoBagHandleSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../redux/storeSlice/cartSlice";
import toast, { Toaster } from "react-hot-toast";

function ProductDetail() {
  const searchParams = useSearchParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemQuantity, setItemQuantity] = useState(1);
  const dispatch = useDispatch();

  const productId = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://fakestoreapi.in/api/products/${productId}`
      );
      const res = await data.json();
      console.log(res);
      setProductData(res?.product);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  const givenPrice =
    productData.price - (productData.price * productData.discount) / 100;

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
    <div className={styles.mainLayout}>
      <div className={styles.imageLayout}>
        <img src={productData?.image} alt="Image" />
      </div>
      <div className={styles.descLayout}>
        <p>{productData?.title}</p>

        <div className={styles.priceLayout}>
          {productData.discount && (
            <p className={styles.orgPrice}>{productData.price}</p>
          )}

          <p className={styles.getPrice}>
            <span>$</span>
            {productData.discount ? givenPrice : productData.price}
          </p>
          {productData.discount && (
            <p className={styles.discountLayout}>
              <span className={styles.discountTag}>
                {productData.discount}%
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
            Model: <span>{productData?.model}</span>
          </p>
          <p>
            Color: <span>{productData?.color}</span>
          </p>
        </div>
        <p className={styles.description}>{productData?.description}</p>

        <div className={styles.quantityLayout}>
          <button onClick={() => setItemQuantity(itemQuantity + 1)}>
            <CiCirclePlus size={40} />
          </button>
          <p className={styles.quantityStyle}>{itemQuantity}</p>
          <button
            onClick={() => {
              if (itemQuantity > 1) setItemQuantity(itemQuantity - 1);
            }}
          >
            <CiCircleMinus size={40} />
          </button>
          <button onClick={handleAddTOCart} className={styles.cartButton}>
            <IoBagHandleSharp />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
