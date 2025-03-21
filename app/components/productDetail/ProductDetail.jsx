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
import StarsIcon from "@mui/icons-material/Stars";
import { Typography } from "@mui/material";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { useQuery, useMutation } from "@tanstack/react-query";
import { addProductToCart } from "../../services/queryFunctions";
import axios from "axios";

function ProductDetail() {
  const searchParams = useSearchParams();
  // const [productData, setProductData] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const dispatch = useDispatch();
  const productId = searchParams.get("id");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const {
    data,
    status,
    error: prodError,
    isPending,
  } = useQuery({
    queryKey: ["getAllProducts", productId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://e-combackend-jbal.onrender.com/product?id=${productId}`,
          { withCredentials: true }
        );

        return response?.data?.data?.product || [];
      } catch (error) {
        console.error("Error fetching cart data:", error);
        throw new Error("Failed to fetch cart details");
      }
    },
  });

  const productData = data || null;
  useEffect(() => {
    if (productData) {
      setSelectedImage(productData.thumbnail);
    }
  }, [productData]);

  const avgRating = productData?.rating ? Number(productData.rating) : 0;

  const givenPrice =
    productData?.price -
    (productData?.price * productData?.discountPercentage) / 100;

  const addProductMutation = useMutation({
    mutationFn: async () => {
      try {
        const toSendData = {
          user: user?.id,
          product: productData?._id,
          quantity: itemQuantity,
        };
        const url = "https://e-combackend-jbal.onrender.com/toCart";

        const response = await axios.post(url, toSendData, {
          withCredentials: true,
        });

        return response;
      } catch (error) {
        toast.error("Failed to add item to cart");
        throw error;
      }
    },

    onSuccess: (response) => {
      toast.success(response?.data?.status);
    },
    enabled: !!user?.id,
  });

  if (isPending) {
    return <LoaderComp />;
  }

  const handleAddTOCart = () => {
    if (!user || !user.id) {
      toast.error("Please login to add item to cart.");
      return;
    }

    addProductMutation.mutate();
  };

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Unable to Load Product
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't fetch the product details. Please try again later.
        </p>
        <BackButton />
      </div>
    );
  }

  return (
    <div className={styles.pageLayout}>
      <BackButton />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-9">
        <div className="space-y-4">
          <div
            className={`aspect-square relative rounded-lg overflow-hidden ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
          >
            <img
              src={selectedImage}
              alt={productData?.title}
              className={`w-full h-full object-contain transition-transform duration-300 ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              onClick={handleImageClick}
              style={{ backgroundColor: "#f8f9fa" }}
            />
          </div>

          {productData?.images && productData?.images?.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {productData?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${productData.title} - ${index + 1}`}
                  className={`aspect-square object-cover rounded-md cursor-pointer hover:opacity-80 transition-all border-2 ${
                    selectedImage === image
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {productData?.category && (
                <Chip
                  label={productData?.category}
                  size="small"
                  sx={{ backgroundColor: "#f3f4f6", color: "#4b5563" }}
                />
              )}
              {productData?.brand && (
                <Chip
                  label={productData?.brand}
                  size="small"
                  sx={{ backgroundColor: "#f3f4f6", color: "#4b5563" }}
                />
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {productData?.title}
            </h1>

            <div className="flex items-center gap-4 mt-2">
              {productData?.discountPercentage && (
                <p className={`text-2xl font-semibold ${styles.orgPrice}`}>
                  ${productData?.price.toFixed(2)}
                </p>
              )}
              <p className="text-2xl font-semibold text-gray-900">
                $
                {productData?.discountPercentage
                  ? givenPrice?.toFixed(2)
                  : productData?.price?.toFixed(2)}
              </p>
              {productData?.discountPercentage && (
                <Chip
                  label={`${productData?.discountPercentage}% OFF`}
                  sx={{
                    backgroundColor: "#f50057",
                    color: "white",
                    border: "none",
                  }}
                />
              )}
            </div>

            <div className="flex items-center gap-2 mt-3 mb-4">
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

            <p className="text-gray-700 mt-2 mb-6 leading-relaxed">
              {productData?.description}
            </p>

            <div className="space-y-4 bg-gray-50 p-5 rounded-lg mt-2 mb-6">
              {productData?.sku && (
                <div className="flex items-center gap-3">
                  <Inventory2OutlinedIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-800">
                    SKU: <span className="font-medium">{productData?.sku}</span>
                  </span>
                </div>
              )}
              {productData?.shippingInformation && (
                <div className="flex items-center gap-3">
                  <LocalShippingOutlinedIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-800">
                    {productData?.shippingInformation}
                  </span>
                </div>
              )}
              {productData?.warrantyInformation && (
                <div className="flex items-center gap-3">
                  <ShieldOutlinedIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-800">
                    {productData?.warrantyInformation}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">Availability:</span>{" "}
                <Chip
                  label={
                    productData?.availabilityStatus ||
                    (productData?.stock > 0 ? "In Stock" : "Out of Stock")
                  }
                  sx={{
                    background: productData?.stock > 0 ? "#10b981" : "#ef4444",
                    color: "white",
                    fontWeight: "500",
                  }}
                />
              </div>
              {productData?.brand && (
                <p className="text-gray-800">
                  <span className="font-medium">Brand:</span>{" "}
                  {productData?.brand}
                </p>
              )}
              {productData?.returnPolicy && (
                <p className="text-gray-800">
                  <span className="font-medium">Return Policy:</span>{" "}
                  {productData?.returnPolicy}
                </p>
              )}
            </div>

            <div className={`${styles.quantityLayout} mt-8`}>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className="p-2 hover:bg-gray-100"
                  onClick={() => {
                    if (itemQuantity > 1) setItemQuantity(itemQuantity - 1);
                  }}
                >
                  <RemoveCircleOutlineIcon
                    sx={{
                      color: itemQuantity > 1 ? "black" : "gray",
                      "&:hover": {
                        transform: itemQuantity > 1 ? "scale(1.1)" : "none",
                        transition: "all 0.2s ease-in-out",
                      },
                    }}
                  />
                </button>
                <p className="px-6 py-1 text-lg font-medium">{itemQuantity}</p>
                <button
                  className="p-2 hover:bg-gray-100"
                  onClick={() => {
                    itemQuantity < productData?.stock &&
                      setItemQuantity(itemQuantity + 1);
                  }}
                >
                  <AddCircleOutlineIcon
                    sx={{
                      color:
                        itemQuantity < productData?.stock ? "black" : "gray",
                      "&:hover": {
                        transform:
                          itemQuantity < productData?.stock
                            ? "scale(1.1)"
                            : "none",
                        transition: "all 0.2s ease-in-out",
                      },
                    }}
                  />
                </button>
              </div>
              <button
                onClick={handleAddTOCart}
                className={`${styles.cartButton} bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all`}
                disabled={!productData?.stock || addProductMutation.isPending}
              >
                <IoBagHandleSharp />
                {addProductMutation.isPending ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Divider className="my-12" />

      <div>
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">
                {avgRating.toFixed(1)}
              </div>
              <div className="mt-2">
                <Rating
                  value={avgRating}
                  precision={0.5}
                  readOnly
                  size="large"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Based on {productData?.mockReviews?.length || 0} reviews
              </p>
            </div>

            <div className="flex-1">
              <div className="space-y-2 w-full max-w-md">
                {[5, 4, 3, 2, 1].map((star) => {
                  const percent = Math.floor(Math.random() * 100);
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <div className="flex items-center w-12">
                        <span className="text-sm font-medium">{star}</span>
                        <StarsIcon sx={{ fontSize: 14, ml: 0.5 }} />
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-yellow-400 rounded-full"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <div className="w-12 text-right">
                        <span className="text-xs text-gray-500">
                          {percent}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-6">
          {productData?.mockReviews?.length > 0 ? (
            productData.mockReviews.map((review, index) => (
              <Card
                key={index}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center">
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#4f46e5", fontWeight: "bold" }}
                      >
                        {review.reviewerName.charAt(0).toUpperCase()}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "medium" }}
                      >
                        {review.reviewerName}
                      </Typography>
                      <div className="flex items-center mt-0.5">
                        <Rating
                          name="review-rating"
                          value={
                            review.rating ||
                            (productData?.rating
                              ? Math.floor(productData.rating)
                              : 0)
                          }
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                      </div>
                    </div>
                  </div>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                </div>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", mt: 1 }}
                >
                  {review.comment}
                </Typography>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <RateReviewOutlinedIcon
                sx={{ fontSize: 48, color: "text.disabled" }}
              />
              <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
                No Reviews Yet
              </Typography>
              <Typography variant="body2" sx={{ color: "text.disabled" }}>
                Be the first to review this product
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
