import Image from "next/image";
import React from "react";
import styles from "./productLayoutStyle.module.scss";
import image from "./bird.jpg";

function ProductLayout() {
  return (
    <div className={styles.mainLayout}>
      <Image src={image} alt="Image" className={styles.imageStyle} />
      <div className={styles.descLayout}>
        <p>Product Desc</p>
        <div className={styles.priceLayout}>
          <p className={styles.orgPrice}>777</p>
          <p className={styles.getPrice}>
            <span>$</span> 265
          </p>
          <p className={styles.discountLayout}>
            <span className={styles.discountTag}>2%</span> <p>Off</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductLayout;
