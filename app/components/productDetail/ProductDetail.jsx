"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import styles from "./productDetails.module.scss";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoBagHandleSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../redux/storeSlice/cartSlice";
import toast from "react-hot-toast";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ReviewLayout from "../review/ReviewLayout";
import Rating from "@mui/material/Rating";
import BackButton from "../Buttons/BackButton";
import Chip from "@mui/material/Chip";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Divider from "@mui/material/Divider";
import LoaderComp from "../loadingPage/LoaderComp";
import Card from "@mui/material/Card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

function ProductDetail() {
  const searchParams = useSearchParams();
  const [productData, setProductData] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const dispatch = useDispatch();
  const productId = searchParams.get("id");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (productData) {
      setSelectedImage(productData.thumbnail);
    }
  }, [productData]);
  const avgRating = productData?.rating ? Number(productData.rating) : 0;

  const [user, setUser] = useState(null);
  const cookieToken = Cookies.get("cookie") || null;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    console.log("LoginUser data:", user);
    console.log("LoginUser cookieToken:", cookieToken);
  }, [user]);

  const {
    isPending,
    error,
    data: newData,
  } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: async () => {
      console.log("Product ID:", productId);
      const response = await fetch(
        `https://e-combackend-jbal.onrender.com/product?id=${productId}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  useEffect(() => {
    if (newData?.data?.product) {
      setProductData(newData?.data?.product);
    }
  }, [isPending, error, newData]);

  const handleAddToCartMutation = useMutation({
    mutationFn: async () => {
      // const token = localStorage.getItem("token"); // Ensure the user has a token

      if (!cookieToken) {
        toast.error("You need to log in first!");
        throw new Error("User is not authenticated");
      }

      const addProductToCart = {
        user: user?.id,
        product: productId,
        quantity: itemQuantity,
      };

      console.log("Adding to cart:", JSON.stringify(addProductToCart));
      console.log("Adding to cart cookieToken:", cookieToken);

      const response = await fetch(
        "https://e-combackend-jbal.onrender.com/toCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookieToken}`, // Attach the token
          },
          body: JSON.stringify(addProductToCart),
        }
      );

      if (!response.ok) {
        throw new Error("Error adding to cart!");
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast.success("Item Added to Cart");
      console.log("Added cart data:", data);
    },
    onError: () => {
      toast.error("Unable to add item to cart");
      console.log(error.message);
    },
  });

  if (isPending) {
    return <LoaderComp />;
  }

  const givenPrice =
    productData?.price -
    (productData?.price * productData?.discountPercentage) / 100;

  const handleAddTOCart = () => {
    if (!user || !user.id) {
      toast.error("You need to log in first!");
      return;
    }

    if (!productData) {
      toast.error("Product data is missing");
      return;
    }

    handleAddToCartMutation.mutate();
  };

  // const handleAddTOCart = () => {
  //   if (!productData) {
  //     toast.error("Product data is missing");
  //     return;
  //   }

  //   handleAddToCartMutation();

  //   // try {
  //   //   dispatch(
  //   //     addItem({
  //   //       ...productData,
  //   //       price: productData.discount ? givenPrice : productData.price,
  //   //       quantity: itemQuantity,
  //   //       isAvaiable: true,
  //   //     })
  //   //   );
  //   //   toast.success("Item added to cart");
  //   // } catch (error) {
  //   //   toast.error("Unable to add item to cart");
  //   // }
  // };

  return (
    <div className={styles.pageLayout}>
      <BackButton />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative">
            <img
              src={selectedImage}
              alt={productData?.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {productData?.images && productData?.images?.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {productData?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${productData.title} - ${index + 1}`}
                  className="aspect-square object-cover rounded-md cursor-pointer hover:opacity-80"
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <Chip
              label={productData?.category && <>{productData?.category}</>}
            />

            <h1 className="text-3xl font-bold">{productData?.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              {productData?.discountPercentage && (
                <p className={`text-2xl font-semibold ${styles.orgPrice}`}>
                  {productData?.price.toFixed(2)}
                </p>
              )}
              <p className="text-2xl font-semibold">
                $
                {productData?.discountPercentage
                  ? givenPrice.toFixed(2)
                  : productData?.price.toFixed(2)}
              </p>
              {productData?.discountPercentage && (
                <>
                  <Chip
                    label={`${productData?.discountPercentage} % OFF`}
                    sx={{
                      backgroundColor: "#f50057",
                      color: "white",
                      border: "none",
                    }}
                  />
                </>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Rating
                name="half-rating"
                value={productData?.rating ? Math.floor(productData.rating) : 0}
                precision={0.5}
                readOnly
              />

              <span className="text-sm text-gray-600">
                {avgRating > 0 ? `(${avgRating} rating)` : "(No ratings yet)"}
              </span>
            </div>

            <p className="text-gray-600 mt-2">{productData?.description}</p>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg mt-2">
              {productData?.sku && (
                <div className="flex items-center gap-2">
                  <Inventory2OutlinedIcon className="h-5 w-5 text-gray-500" />
                  <span>SKU: {productData?.sku}</span>
                </div>
              )}
              {productData?.shippingInformation && (
                <div className="flex items-center gap-2">
                  <LocalShippingOutlinedIcon className="h-5 w-5 text-gray-500" />
                  <span>{productData?.shippingInformation}</span>
                </div>
              )}
              {productData?.warrantyInformation && (
                <div className="flex items-center gap-2">
                  <ShieldOutlinedIcon className="h-5 w-5 text-gray-500" />
                  <span>{productData?.warrantyInformation}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 mt-2">
              <div className="text-sm">
                <span className="font-medium">Availability:</span>{" "}
                <Chip
                  label={
                    productData?.availabilityStatus ||
                    (productData?.stock > 0 ? "In Stock" : "Out of Stock")
                  }
                  sx={{ background: "black", color: "white" }}
                />
              </div>
              {productData?.brand && (
                <p className="text-sm">
                  <span className="font-medium">Brand:</span>{" "}
                  {productData?.brand}
                </p>
              )}
              {productData?.returnPolicy && (
                <p className="text-sm">
                  <span className="font-medium">Return Policy:</span>{" "}
                  {productData?.returnPolicy}
                </p>
              )}
            </div>
          </div>

          <div className={styles.quantityLayout}>
            <button
              onClick={() => {
                itemQuantity < productData?.stock &&
                  setItemQuantity(itemQuantity + 1);
              }}
            >
              <AddCircleOutlineIcon
                fontSize="large"
                sx={{
                  color: "black",
                  fontWeight: "normal",
                  "&:hover": {
                    scale: 1.1,
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              />
            </button>
            <p className={styles.quantityStyle}>{itemQuantity}</p>
            <button
              onClick={() => {
                if (itemQuantity > 1) setItemQuantity(itemQuantity - 1);
              }}
            >
              <RemoveCircleOutlineIcon
                fontSize="large"
                sx={{
                  color: "black",
                  fontWeight: "normal",
                  "&:hover": {
                    scale: 1.1,
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              />
            </button>
            <button onClick={handleAddTOCart} className={styles.cartButton}>
              <IoBagHandleSharp />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Divider className="my-12" />

      <section>
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {productData?.mockReviews.map((review, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium">{review.reviewerName}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Rating
                      name="half-rating"
                      value={
                        productData?.rating ? Math.floor(productData.rating) : 0
                      }
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
