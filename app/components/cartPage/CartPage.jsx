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

function CartPage() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const cartItems = useSelector((state) => state.cartItems.value);
  const [deleteItem, setDeleteItem] = useState(null);
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

  return (
    <div className={styles.mainLayout}>
      {isModelOpen && (
        <DeleteComponent
          title="Product"
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
            <div>
              <img
                className={styles.imageStyle}
                src={item.thumbnail}
                alt="Image"
              />
            </div>
            <div>
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
                  ${item.price * item.quantity}
                </span>
              </p>
              <p
                className={item.isAvaiable ? styles.inStock : styles.outOfStock}
              >
                {item.isAvaiable ? `In Stock (${item.stock})` : "Out of stock"}
              </p>
              <div>
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
