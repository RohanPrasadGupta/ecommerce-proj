import React, { useEffect, useRef, useState } from "react";
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
  resetCheckItems,
} from "../../redux/storeSlice/selectItemSlice";
import EmptyData from "../emptyPageData/EmptyData";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { userCartData } from "../../services/queryFunctions";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import GlobalButton from "../Buttons/GlobalButton";
import LoaderComp from "../loadingPage/LoaderComp";
import { Box } from "@mui/material";

function CartPage() {
  const [user, setUser] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const cartItems = useSelector((state) => state.cartItems.value);
  const itemSelected = useSelector((state) => state.cartSelectItems.value);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.name);
    }
  }, []);

  const userId = user?.id;

  const { data, status, error } = useQuery({
    queryKey: userId ? ["cartInfo", userId] : ["cartInfo"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://e-combackend-jbal.onrender.com/toCart?UserId=${userId}`,
          { withCredentials: true }
        );
        // console.log("API Response:", response.data);
        return response?.data?.data?.cart?.products || [];
      } catch (error) {
        console.error("Error fetching cart data:", error);
        throw new Error("Failed to fetch cart details");
      }
    },
    enabled: !!userId,
  });
  const cartData = Array.isArray(data) ? data : [];

  const deleteMutation = useMutation({
    mutationFn: (item) =>
      axios.delete(
        `https://e-combackend-jbal.onrender.com/toCart?UserId=${user.id}&productId=${item._id}`,
        { withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
      toast.success("Item deleted successfully");
    },
  });

  const addOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      const response = await axios.post(
        "https://e-combackend-jbal.onrender.com/order",
        orderData,
        { withCredentials: true }
      );
      // console.log("API Response:", response);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
      queryClient.invalidateQueries({ queryKey: ["ongoingOrderInfo"] });
      // dispatch(resetCheckItems());
      toast.success("Order placed successfully");
    },
    onError: (error) => {
      toast.error("Order failed! Please try again.");
      console.error("Error placing order:", error);
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productIndexId, quantity }) => {
      await axios.post("https://e-combackend-jbal.onrender.com/updateCart", {
        productIndexId,
        userID: user?.id,
        quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
      toast.success("Cart updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update cart quantity.");
    },
  });

  const sippingCharge = 5;

  const TotalPrice = Number(
    itemSelected.reduce((total, item) => total + item.price, 0).toFixed(2)
  );

  const TotalCostPrice = TotalPrice + sippingCharge;

  if (cartData && cartData.length === 0) {
    return <EmptyData windowHeight="50vh" text="Your cart is empty." />;
  }

  const handleIncrementCart = (item) => {
    if (item.quantity < item.product.stock) {
      updateQuantityMutation.mutate({
        productIndexId: item._id,
        quantity: item.quantity + 1,
      });
    }
  };

  const handleDecrementCart = (item) => {
    if (item.quantity > 1) {
      updateQuantityMutation.mutate({
        productIndexId: item._id,
        quantity: item.quantity - 1,
      });
    }
  };

  const handeleDeleteItem = (item) => {
    deleteMutation.mutate(item);
  };

  const handleChange = (item, event) => {
    if (item.product.availabilityStatus !== "In Stock") {
      toast.error("Sorry, this item is out of stock and cannot be ordered.");
      return;
    }

    if (event.target.checked) {
      dispatch(
        addCheckItem({
          _id: item.product._id,
          price: Number((item.product.price * item.quantity).toFixed(2)),
          quantity: item.quantity,
          ProdCartId: item._id,
        })
      );
    } else {
      dispatch(removeCheckItem({ _id: item.product._id }));
    }
  };

  const handleCheckOut = () => {
    if (user === null) {
      toast.error("Please login first");
      return;
    }

    if (itemSelected.length === 0) {
      toast.error("Please select at least one item to checkout.");
      return;
    }

    if (address === "") {
      toast.error("Please enter your address.");
      return;
    }

    if (name === "") {
      toast.error("Please enter your name.");
      return;
    }

    if (phoneNumber === "" || phoneNumber.length !== 10) {
      toast.error("Please enter your phone number.");
      return;
    }

    const orderProdArray = [];

    if (itemSelected.length > 0) {
      itemSelected.forEach((item) => {
        const data = {
          product: item._id,
          quantity: item.quantity,
          orderedPrice: item.price,
          ProdCartId: item.ProdCartId,
        };

        orderProdArray.push(data);
      });
    }

    const sendOrder = {
      user: userId,
      orderItems: orderProdArray,
      address: address,
      name: name,
      phoneNumber: phoneNumber,
      shippingFee: Number(sippingCharge),
      totalAmount: Number(TotalCostPrice),
    };

    console.log("sendOrder", sendOrder);

    addOrderMutation.mutate(sendOrder);
    itemSelected.forEach((item) => {
      dispatch(removeCheckItem({ _id: item._id }));
    });
  };

  if (status === "loading") return <LoaderComp />;
  if (status === "error") return <p>Error fetching cart data</p>;

  return (
    <>
      {isModelOpen && (
        <DeleteComponent
          title="Product"
          isModelOpen={isModelOpen}
          deleteFunction={() => {
            handeleDeleteItem(deleteItem);
            // dispatch(removeItem(deleteItem));
            setIsModelOpen(false);
          }}
          closeModal={() => {
            setIsModelOpen(false);
            setDeleteItem(null);
          }}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-6 bg-gray-50 p-4 md:p-6">
        <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">
              Shopping Cart
            </h2>
            <p className="text-sm text-gray-500">
              {cartData.length} {cartData.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left w-10"></th>
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left w-10"></th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item) => (
                  <tr
                    key={item._id}
                    className={`border-b border-gray-100 transition-colors ${
                      item.product.availabilityStatus !== "In Stock"
                        ? "bg-gray-50 opacity-75"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="py-4 px-4">
                      <Checkbox
                        checked={itemSelected.some(
                          (selectedItem) =>
                            selectedItem._id === item.product._id
                        )}
                        onChange={(event) => handleChange(item, event)}
                        disabled={
                          item.product.availabilityStatus !== "In Stock"
                        }
                        sx={{
                          color:
                            item.product.availabilityStatus !== "In Stock"
                              ? "#d1d5db"
                              : "#6366f1",
                          "&.Mui-checked": {
                            color: "#6366f1",
                          },
                          "&.Mui-disabled": {
                            color: "#d1d5db",
                          },
                        }}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                          <img
                            src={item?.product?.thumbnail}
                            alt={item?.product?.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.product.title}
                          </h3>
                          <div className="mt-1 flex items-center gap-2">
                            <p className="text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                item.product.availabilityStatus === "In Stock"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.product.availabilityStatus === "In Stock"
                                ? `In Stock (${item.product.stock})`
                                : "Out of stock"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      ${item.product.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center border border-gray-200 rounded-lg max-w-[120px]">
                        <button
                          disabled={item.quantity === 1}
                          type="button"
                          onClick={() => handleDecrementCart(item)}
                          className={`p-2 ${
                            item.quantity === 1
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-600 hover:bg-gray-100"
                          } rounded-l-lg focus:outline-none`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                          </svg>
                        </button>
                        <span className="px-3 py-1 text-center w-10 text-gray-900 bg-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={item.quantity === item.product.stock}
                          onClick={() => handleIncrementCart(item)}
                          className={`p-2 ${
                            item.quantity === item.product.stock
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-600 hover:bg-gray-100"
                          } rounded-r-lg focus:outline-none`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModelOpen(true);
                          setDeleteItem(item);
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">
                Order Summary
              </h2>
            </div>

            <div className="p-4 md:p-6">
              {itemSelected.length === 0 ? (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-gray-500 mb-2">No items selected</p>
                  <p className="text-sm text-gray-400">
                    Select products to checkout
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button className="flex-shrink-0 bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${TotalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Shipping</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${sippingCharge.toFixed(2)}
                      </p>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <p className="text-base font-semibold text-gray-900">
                          Total
                        </p>
                        <p className="text-base font-semibold text-gray-900">
                          ${TotalCostPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping info */}
                  <div className="space-y-4 mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-base font-medium text-gray-900">
                      Shipping Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="text"
                          placeholder="Your phone number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          value={phoneNumber}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckOut}
                    className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <div className="flex items-center justify-center">
                      <LocalShippingIcon className="mr-2" fontSize="small" />
                      Complete Checkout
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
