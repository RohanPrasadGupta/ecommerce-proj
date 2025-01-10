import React, { useState } from "react";
import styles from "./categoriesStyles.module.scss";

function CatagoryNav({ setSelectCategory }) {
  const categories = [
    "all",
    "tv",
    "audio",
    "laptop",
    "mobile",
    "gaming",
    "appliances",
  ];

  const [activeButton, setActiveButton] = useState("all");

  return (
    <>
      <div className={styles.categoriesMainLayout}>
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            className={`${styles.categoriesButtons} ${
              activeButton === item ? styles.activeButton : ""
            }`}
            onClick={() => {
              setSelectCategory(item);
              setActiveButton(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

export default CatagoryNav;
