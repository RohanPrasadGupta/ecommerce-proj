import React, { useEffect, useState } from "react";
import styles from "./cardPageStyle.module.scss";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../redux/storeSlice/cartSlice";

function CartPage() {
  const cartItems = useSelector((state) => state.cartItems.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("items", cartItems);
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCartLayout}>
        <p>Cart is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.mainLayout}>
      <div className={styles.leftLayout}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItemsLayout}>
            <div>
              <img className={styles.imageStyle} src={item.image} alt="Image" />
            </div>
            <div>
              <p>{item.title}</p>
              <p>
                Color: <span>{item.color}</span>
              </p>
              <p className={styles.priceTag}>
                Price: <span>${item.price}</span>
              </p>
              <p
                className={item.isAvaiable ? styles.inStock : styles.outOfStock}
              >
                {item.isAvaiable ? "In Stock" : "Out of stock"}
              </p>
              <div>
                <div className={styles.quantityLayout}>
                  <p>Qty: </p>
                  <div className={styles.quantityBtnStyle}>
                    <button>
                      <CiCirclePlus className={styles.incDecBtn} size={20} />
                    </button>
                    <p className={styles.quantityStyle}>{item.quantity}</p>
                    <button>
                      <CiCircleMinus className={styles.incDecBtn} size={20} />
                    </button>
                  </div>
                  <button className={styles.removeButton}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>Pricing Total Side</div>
    </div>
  );
}

export default CartPage;
