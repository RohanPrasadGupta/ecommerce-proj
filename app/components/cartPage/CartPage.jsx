import React, { useEffect, useState } from "react";
import styles from "./cardPageStyle.module.scss";
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
  const [deleteItem, setDeleteItem] = useState(null);
  const cartItems = useSelector((state) => state.cartItems.value);
  const itemSelected = useSelector((state) => state.cartSelectItems.value);
  const dispatch = useDispatch();

  const sippingCharge = 3;

  const TotalPrice = itemSelected
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const TotalCostPrice = Number(TotalPrice) + sippingCharge;
  console.log("TotalCostPrice", TotalCostPrice);

  useEffect(() => {
    console.log("cartItems", cartItems);
  }, [cartItems]);

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

  return (
    <>
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

      <div className="flex flex-col md:flex-row bg-gray-100 p-6">
        {/* Cart Items */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th></th>
                <th className="text-left">Product</th>
                <th className="text-left">Price</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="border-b">
                  <td>
                    <Checkbox
                      checked={itemSelected.some(
                        (selectedItem) => selectedItem.id === item.id
                      )}
                      onChange={(event) => handleChange(item, event)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </td>
                  <td className="flex items-center py-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 mr-4 rounded-md"
                    />
                    <div>
                      <p>{item.title}</p>
                      <div className="flex items-center gap-2">
                        <p>{item.brand}</p>
                        <p
                          className={
                            item.isAvaiable ? styles.inStock : styles.outOfStock
                          }
                        >
                          {item.isAvaiable
                            ? `In Stock (${item.stock})`
                            : "Out of stock"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td className="flex items-center gap-2">
                    <button
                      disabled={item.quantity === 1}
                      type="button"
                      onClick={() => handleDecrementCart(item)}
                      className={`px-2 py-1 ${
                        item.quantity === 1 ? "bg-gray-400" : "bg-gray-200"
                      }  rounded`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      disabled={item.quantity === item.stock}
                      onClick={() => handleIncrementCart(item)}
                      className={`px-2 py-1 ${
                        item.quantity === item.stock
                          ? "bg-gray-400"
                          : "bg-gray-200"
                      }   rounded`}
                    >
                      +
                    </button>
                  </td>
                  <td className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handeleDeleteItem(item)}
                      className="text-red-500"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="w-full md:w-1/3 bg-gray-200 p-6 rounded-lg shadow-md mt-6 md:mt-0 md:ml-6">
          {itemSelected.length === 0 ? (
            <div className="h-96 flex items-center justify-center">
              <EmptyData
                windowHeight="max-content"
                text="Please select items to checkout."
                setFontSize="20px"
              />
            </div>
          ) : (
            <>
              <h2 className="font-semibold text-lg">Discount / Promo Code</h2>
              <div className="flex mt-3">
                <input
                  type="text"
                  placeholder="Promo Code Here"
                  className="w-full p-2 border rounded"
                />
                <button className="bg-blue-600 text-white px-4 py-2 ml-2 rounded">
                  Apply
                </button>
              </div>
              <div className="border-t my-4"></div>
              <p>Subtotal: ${TotalPrice}</p>
              <div className="mt-3">
                <p>Subtotal: ${sippingCharge}</p>
              </div>
              <p className="mt-4">
                Address: Kyla Olsen Ap #651-8679 Tamuning PA 10855
              </p>
              <button className="text-blue-600 mt-2">Change Address</button>
              <div className="border-t my-4"></div>
              <p className="font-semibold">Total: ${TotalCostPrice}</p>
              <button className="bg-blue-600 text-white w-full py-3 mt-4 rounded">
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
