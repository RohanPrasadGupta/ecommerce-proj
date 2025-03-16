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
      toast.success("Order placed successfully");
      checkFunction(orderData);
    },
    onError: (error) => {
      toast.error("Order failed! Please try again.");
      console.error("Error placing order:", error);
    },
  });

  const sippingCharge = 3;

  const TotalPrice = Number(
    itemSelected.reduce((total, item) => total + item.price, 0).toFixed(2)
  );

  const TotalCostPrice = TotalPrice + sippingCharge;

  if (cartData && cartData.length === 0) {
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

  const handleChange = (item, event) => {
    if (event.target.checked) {
      dispatch(
        addCheckItem({
          _id: item.product._id,
          price: Number((item.product.price * item.quantity).toFixed(2)),
          quantity: item.quantity,
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

    console.log(itemSelected);

    if (itemSelected.length > 0) {
      itemSelected.forEach((item) => {
        const data = {
          product: item._id,
          quantity: item.quantity,
          orderedPrice: item.price,
        };

        orderProdArray.push(data);
      });
    }

    const sendOrder = {
      user: userId,
      orderItems: orderProdArray,
    };
    console.log(sendOrder);

    addOrderMutation.mutate(sendOrder);

    // axios
    //   .post("https://e-combackend-jbal.onrender.com/order", data, {
    //     withCredentials: true,
    //   })
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

      <div className="flex flex-col lg:flex-row bg-gray-100 p-6">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
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
                        (selectedItem) => selectedItem._id === item.product._id
                      )}
                      onChange={(event) => handleChange(item, event)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </td>
                  <td className="flex items-center py-4">
                    <img
                      src={item?.product?.thumbnail}
                      alt={item?.product?.title}
                      className="w-16 h-16 mr-4 rounded-md"
                    />
                    <div>
                      <p>{item.product.title}</p>
                      <div className="flex items-center gap-2">
                        <p>{item.product.brand}</p>
                        <p
                          className={
                            item.product.availabilityStatus === "In Stock"
                              ? styles.inStock
                              : styles.outOfStock
                          }
                        >
                          {item.product.availabilityStatus === "In Stock"
                            ? `In Stock (${item.product.stock})`
                            : "Out of stock"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>${item.product.price.toFixed(2)}</td>
                  <td className="flex items-center gap-2 ">
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
                      onClick={() => {
                        setIsModelOpen(true);
                        setDeleteItem(item);
                      }}
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

        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg mt-6 lg:mt-0 lg:ml-6">
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
              <h2 className="font-semibold text-lg text-gray-700 mb-2">
                Discount / Promo Code
              </h2>
              <div className="flex mt-3">
                <input
                  type="text"
                  placeholder="Promo Code Here"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 ml-2 rounded-md hover:bg-blue-700 transition">
                  Apply
                </button>
              </div>

              <div className="border-t my-4 border-gray-300"></div>

              {/* Pricing Details */}
              <p className="text-gray-600">
                <span className="font-semibold">Subtotal:</span> ${TotalPrice}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Shipping Charge:</span> $
                {sippingCharge}
              </p>

              {/* Address Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  marginTop: "10px",
                }}
              >
                <p>Address:</p>
                <input
                  type="text"
                  placeholder="Please enter your address."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Box>
                    <p>Name:</p>
                    <input
                      type="text"
                      placeholder="Please enter your name."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setAddress(e.target.value)}
                      value={name}
                    />
                  </Box>
                  <Box>
                    <p>Phone:</p>
                    <input
                      type="number"
                      placeholder="Phone Number 98XX.."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                    />
                  </Box>
                </Box>
              </Box>
              <button className="text-blue-600 mt-2 hover:underline">
                Change Address
              </button>

              <div className="border-t my-4 border-gray-300"></div>

              <p className="text-xl font-semibold text-gray-800">
                Total: ${TotalCostPrice}
              </p>

              <GlobalButton
                text="Checkout"
                icomon={<LocalShippingIcon />}
                fontSize="20px"
                hoverEffect={true}
                onClick={handleCheckOut}
                className="w-full mt-4"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
