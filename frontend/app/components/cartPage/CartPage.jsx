import React, { useEffect, useState } from "react";
import testImage from "./test.png";
import Image from "next/image";
import styles from "./cardPageStyle.module.scss";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const TestData = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    color: "black",
    price: 109.95,
    discount: 10,
    image: testImage,
    isAvaiable: true,
    quantity: 1,
  },
  {
    id: 2,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    color: "black",
    price: 109.95,
    discount: 10,
    image: testImage,
    isAvaiable: true,
    quantity: 2,
  },
  {
    id: 3,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    color: "red",
    price: 109.95,
    discount: 10,
    image: testImage,
    isAvaiable: false,
    quantity: 5,
  },
];

function CartPage() {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {}, []);

  return (
    <div className={styles.mainLayout}>
      <div className={styles.leftLayout}>
        {TestData.map((item) => (
          <div key={item.id} className={styles.cartItemsLayout}>
            <div>
              <Image
                className={styles.imageStyle}
                sizes={5}
                src={item.image}
                alt="Image"
              />
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
                    <p className={styles.quantityStyle}>{quantity}</p>
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
