import React, { useEffect, useState } from "react";
import styles from "./cardPageStyle.module.scss";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
} from "../../redux/storeSlice/cartSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteComponent from "../deleteComp/DeleteComponent";
import Checkbox from "@mui/material/Checkbox";
import {
  addCheckItem,
  removeCheckItem,
} from "../../redux/storeSlice/selectItemSlice";
import EmptyData from "../emptyPageData/EmptyData";
import Button from "@mui/material/Button";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function CartPage() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const cartItems = useSelector((state) => state.cartItems.value);
  const [deleteItem, setDeleteItem] = useState(null);
  const dispatch = useDispatch();

  const itemSelected = useSelector((state) => state.cartSelectItems.value);

  const sippingCharge = 3;

  // useEffect(() => {
  //   console.log("items", cartItems);
  //   console.log("itemSelected", itemSelected);
  // }, [cartItems, itemSelected]);

  if (cartItems.length === 0) {
    return <EmptyData windowHeight="90vh" text="Your cart is empty." />;
  }

  const handleIncrementCart = (item) => {
    if (item.quantity < item.stock) {
      dispatch(incrementItem(item));
    }
  };

  const handleDecrementCart = (item) => {
    dispatch(decrementItem(item));
  };

  const handeleDeleteItem = (item) => {
    setIsModelOpen(true);
    setDeleteItem(item);
  };

  const handleChange = (item, event) => {
    if (event.target.checked) {
      dispatch(
        addCheckItem({ id: item.id, price: item.price * item.quantity })
      );
    } else {
      dispatch(removeCheckItem({ id: item.id }));
    }
  };

  const TotalPrice = itemSelected
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const TotalCostPrice = TotalPrice + sippingCharge;

  return (
    <div className={styles.mainLayout}>
      {isModelOpen && (
        <DeleteComponent
          title="Product"
          isModelOpen={isModelOpen}
          deleteFunction={() => {
            dispatch(removeItem(deleteItem));
            setIsModelOpen(false);
          }}
          closeModal={() => {
            setIsModelOpen(false);
            setDeleteItem(null);
          }}
        />
      )}

      <div className={styles.leftLayout}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItemsLayout}>
            <div style={{ width: "20%" }}>
              <img
                className={styles.imageStyle}
                src={item.thumbnail}
                alt="Image"
              />
            </div>
            <div style={{ width: "80%" }}>
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                {item.title}
              </p>
              <p style={{ fontWeight: "bold" }}>
                Brand:{" "}
                <span style={{ fontWeight: "normal" }}>{item.brand}</span>
              </p>
              <p style={{ fontWeight: "bold" }} className={styles.priceTag}>
                Price:{" "}
                <span style={{ fontWeight: "normal" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </p>
              <p
                className={item.isAvaiable ? styles.inStock : styles.outOfStock}
              >
                {item.isAvaiable ? `In Stock (${item.stock})` : "Out of stock"}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.quantityLayout}>
                  <p>Qty: </p>
                  <div className={styles.quantityBtnStyle}>
                    <button
                      type="button"
                      disabled={item.quantity === item.stock}
                      onClick={() => handleIncrementCart(item)}
                    >
                      <AddCircleOutlineIcon
                        fontSize="medium"
                        sx={{
                          color:
                            item.quantity === item.stock ? "gray" : "black",
                          fontWeight: "normal",
                          "&:hover": {
                            scale: item.quantity === item.stock ? 1 : 1.1,
                            transition: "all 0.2s ease-in-out",
                          },
                        }}
                      />
                    </button>
                    <p className={styles.quantityStyle}>{item.quantity}</p>
                    <button
                      disabled={item.quantity === 1}
                      type="button"
                      onClick={() => handleDecrementCart(item)}
                    >
                      <RemoveCircleOutlineIcon
                        fontSize="medium"
                        sx={{
                          color: item.quantity === 1 ? "gray" : "black",
                          fontWeight: "normal",
                          "&:hover": {
                            scale: item.quantity === 1 ? 1 : 1.1,
                            transition: "all 0.2s ease-in-out",
                          },
                        }}
                      />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handeleDeleteItem(item)}
                    className={styles.removeButton}
                  >
                    <DeleteOutlineOutlinedIcon
                      fontSize="medium"
                      sx={{
                        color: "black",
                        fontWeight: "normal",
                        "&:hover": {
                          scale: 1.1,
                          transition: "all 0.2s ease-in-out",
                          color: "red",
                        },
                      }}
                    />
                  </button>
                </div>
                <Checkbox
                  checked={itemSelected.some(
                    (selectedItem) => selectedItem.id === item.id
                  )}
                  onChange={(event) => handleChange(item, event)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.rightLayout}>
        {itemSelected.length === 0 ? (
          <EmptyData
            windowHeight="30vh"
            text="Please select items to checkout."
          />
        ) : (
          <>
            <div className={styles.rightLayoutTitle}>
              <p>Total Item Selected : ({itemSelected.length})</p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 20px",
                }}
              >
                <p>Item Sub Total :</p>
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  ${TotalPrice}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 20px",
                }}
              >
                <p>Shipping Charge :</p>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  ${sippingCharge}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 20px",
                }}
              >
                <p>Voucher & Code :</p>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "rgb(208 98 98)",
                  }}
                >
                  $0
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 20px",
                }}
              >
                <p>Total VAT Included :</p>
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  ${TotalCostPrice}
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{ width: "fit-content" }}
                variant="contained"
                endIcon={<LocalShippingIcon />}
              >
                Place Order
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
