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
import { userCartData } from "../../services/queryFunctions";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function CartPage() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const cartItems = useSelector((state) => state.cartItems.value);
  const itemSelected = useSelector((state) => state.cartSelectItems.value);
  const dispatch = useDispatch();
  // const [cartData, setCartData] = useState([]);
  const queryClient = useQueryClient();

  const user = JSON.parse(localStorage.getItem("user")) || null;

  const { data, status, error } = useQuery({
    queryKey: user?.id ? ["cartInfo", user.id] : ["cartInfo"],
    queryFn: () => userCartData(user?.id),
    enabled: !!user?.id, // Prevent running the query if `user?.id` is not available
  });

  const deleteMutation = useMutation({
    mutationFn: (item) =>
      axios.delete(
        `http://localhost:3001/toCart?UserId=${user.id}&productId=${item._id}`,
        { withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartInfo", user.id] });
      toast.success("Item deleted successfully");
    },
  });

  const cartData = data?.data?.cart?.products || [];

  useEffect(() => {
    console.log("status, data,error", status, data, error);
    // if (data && data.data) setCartData(data.data.cart.products);
    // if (user === null) setCartData([]);
    console.log("LoginUser:", user);
    console.log("cartData:", cartData);
  }, [status, data, user, cartData, error]);

  const sippingCharge = 3;

  const TotalPrice = Number(
    itemSelected.reduce((total, item) => total + item.price, 0).toFixed(2)
  );

  const TotalCostPrice = TotalPrice + sippingCharge;

  if (cartData.length === 0) {
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
    deleteMutation.mutate(item);
  };

  // const handeleDeleteItem = (item) => {
  //   axios
  //     .delete(
  //       `http://localhost:3001/toCart?UserId=${user.id}&productId=${item._id}`
  //     )
  //     .then((response) => {
  //       console.log("response", response);
  //       queryClient.invalidateQueries({ queryKey: ["cartInfo", user.id] });
  //     });
  //   // setIsModelOpen(true);
  //   // setDeleteItem(item);
  // };

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
              {cartData.map((item) => (
                <tr key={item._id} className="border-b">
                  <td>
                    <Checkbox
                      checked={itemSelected.some(
                        (selectedItem) => selectedItem.id === item._id
                      )}
                      onChange={(event) => handleChange(item, event)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </td>
                  <td className="flex items-center py-4">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-16 h-16 mr-4 rounded-md"
                    />
                    <div>
                      <p>{item.product.title}</p>
                      <div className="flex items-center gap-2">
                        <p>{item.product.brand}</p>
                        <p
                          className={
                            item.product.isAvaiable
                              ? styles.inStock
                              : styles.outOfStock
                          }
                        >
                          {item.product.isAvaiable
                            ? `In Stock (${item.stock})`
                            : "Out of stock"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>${item.product.price.toFixed(2)}</td>
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
                        item.quantity === item.product.stock
                          ? "bg-gray-400"
                          : "bg-gray-200"
                      }   rounded`}
                    >
                      +
                    </button>
                  </td>
                  <td className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
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
                <LocalShippingIcon /> Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
