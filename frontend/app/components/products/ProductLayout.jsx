import Image from "next/image";
import React, { useRef } from "react";
import styles from "./productLayoutStyle.module.scss";
import image from "./bird.jpg";
import Link from "next/link";

function ProductLayout({ data, setSelectedProductId }) {
  // console.log(data);

  const TitleLength = (title) => {
    if (title.length > 20) {
      return title.slice(0, 20) + "...";
    }
    return title;
  };

  const givenPrice = data.price - (data.price * data.discount) / 100;

  const handleClick = (productId) => {
    console.log("clicked", productId);
    window.location.href = `/pages/productDetail`;
    setSelectedProductId(productId);
  };

  return (
    <Link
      href={{
        pathname: "/pages/productDetail",
        query: { id: data.id },
      }}
      // onClick={() => handleClick(data.id)}
      className={styles.mainLayout}
    >
      <img src={data.image} alt="Image" className={styles.imageStyle} />
      <div className={styles.descLayout}>
        <p>{TitleLength(data.title)}</p>
        <div className={styles.priceLayout}>
          {data.discount && <p className={styles.orgPrice}>{data.price}</p>}

          <p className={styles.getPrice}>
            <span>$</span>
            {data.discount ? givenPrice : data.price}
          </p>
          {data.discount && (
            <p className={styles.discountLayout}>
              <span className={styles.discountTag}>{data.discount}%</span>
              <span>Off</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductLayout;
