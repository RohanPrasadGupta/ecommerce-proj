import React, { useEffect, useState } from "react";
import styles from "./categoriesStyles.module.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function CatagoryNav({ setSelectCategory }) {
  const newCategories = [
    {
      title: "Fashion",
      types: [
        { slug: "mens-shirts", name: "Mens Shirts" },
        { slug: "mens-shoes", name: "Mens Shoes" },
        { slug: "mens-watches", name: "Mens Watches" },
        { slug: "womens-bags", name: "Womens Bags" },
        { slug: "womens-dresses", name: "Womens Dresses" },
        { slug: "womens-jewellery", name: "Womens Jewellery" },
        { slug: "womens-shoes", name: "Womens Shoes" },
        { slug: "womens-watches", name: "Womens Watches" },
        { slug: "tops", name: "Tops" },
        { slug: "sunglasses", name: "Sunglasses" },
      ],
    },
    {
      title: "Beauty and Personal Care",
      types: [
        { slug: "beauty", name: "Beauty" },
        { slug: "fragrances", name: "Fragrances" },
        { slug: "skin-care", name: "Skin Care" },
      ],
    },
    {
      title: "Electronics",
      types: [
        { slug: "laptops", name: "Laptops" },
        { slug: "smartphones", name: "Smartphones" },
        { slug: "tablets", name: "Tablets" },
        { slug: "mobile-accessories", name: "Mobile Accessories" },
      ],
    },
    {
      title: "Home and Living",
      types: [
        { slug: "furniture", name: "Furniture" },
        { slug: "home-decoration", name: "Home Decoration" },
        { slug: "kitchen-accessories", name: "Kitchen Accessories" },
      ],
    },
    {
      title: "Sports and Outdoors",
      types: [
        { slug: "sports-accessories", name: "Sports Accessories" },
        { slug: "motorcycle", name: "Motorcycle" },
        { slug: "vehicle", name: "Vehicle" },
      ],
    },
    {
      title: "Groceries and Food",
      types: [{ slug: "groceries", name: "Groceries" }],
    },
  ];

  const [selectedValues, setSelectedValues] = useState(
    newCategories.reduce((acc, category) => {
      acc[category.title] = "";
      return acc;
    }, {})
  );

  const handleSelectChange = (categoryTitle, selectedSlug) => {
    const updatedValues = { ...selectedValues, [categoryTitle]: selectedSlug };
    setSelectedValues(updatedValues);
    setSelectCategory(selectedSlug);
  };

  const handleReset = () => {
    const resetValues = newCategories.reduce((acc, category) => {
      acc[category.title] = "";
      return acc;
    }, {});

    setSelectedValues(resetValues);
    setSelectCategory("");
  };

  return (
    <>
      <div className={styles.categoriesMainLayout}>
        {newCategories.map((category) => (
          <FormControl key={category.title} fullWidth>
            <InputLabel id={`select-label-${category.title}`}>
              {category.title}
            </InputLabel>
            <Select
              labelId={`select-label-${category.title}`}
              id={`select-${category.title}`}
              value={selectedValues[category.title]}
              onChange={(e) =>
                handleSelectChange(category.title, e.target.value)
              }
            >
              {category.types.map((type) => (
                <MenuItem key={type.slug} value={type.slug}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
        <div className={styles.resetButtonContainer}>
          <button
            className={styles.resetButton}
            variant="outlined"
            color="primary"
            onClick={handleReset}
          >
            <AutorenewIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default CatagoryNav;
