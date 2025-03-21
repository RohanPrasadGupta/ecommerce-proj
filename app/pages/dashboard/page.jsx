"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  Alert,
  Chip,
  IconButton,
} from "@mui/material";
import ProductLayout from "../../components/products/ProductLayout";
import styles from "./dashboardStyle.module.scss";
import CatagoryNav from "../../components/catagoryNav/CatagoryNav";
import MuiProductLayout from "../../components/products/MuiProductLayout";
import LoaderComp from "../../components/loadingPage/LoaderComp";
import { useQuery } from "@tanstack/react-query";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function PageContent() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const productsPerPage = 12;

  const { isPending, error, data } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      const URL = "https://e-combackend-jbal.onrender.com/getAllProducts";
      const cateURL = `https://e-combackend-jbal.onrender.com/getProductsByCategory?category=${selectedCategory}`;
      const response = await fetch(selectedCategory === "all" ? URL : cateURL);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (data?.data?.products) {
      setProducts(data.data.products);
    }
  }, [data]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    switch (sortOrder) {
      case "price_low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            {selectedCategory === "all"
              ? "All Products"
              : `${
                  selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)
                } Products`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexGrow: 1,
              maxWidth: { xs: "100%", sm: "400px" },
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search products..."
              size="small"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box container spacing={2} alignItems="center">
            <Box item xs={12} md={8}>
              <CatagoryNav setSelectCategory={handleCategoryChange} />
            </Box>

            <Box sx={{ marginTop: "20px" }} item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel id="sort-select-label">Sort By</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    label="Sort By"
                    startAdornment={
                      <SortIcon sx={{ color: "text.secondary", mr: 1 }} />
                    }
                  >
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="price_low">Price: Low to High</MenuItem>
                    <MenuItem value="price_high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Top Rated</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {displayedProducts.length} of {filteredProducts.length}{" "}
            products
          </Typography>

          {/* Active filters */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {searchQuery && (
              <Chip
                label={`Search: ${searchQuery}`}
                size="small"
                onDelete={() => setSearchQuery("")}
              />
            )}
            {sortOrder !== "default" && (
              <Chip
                label={`Sort: ${sortOrder.replace("_", " ")}`}
                size="small"
                onDelete={() => setSortOrder("default")}
              />
            )}
          </Box>
        </Box>

        {isPending ? (
          <LoaderComp />
        ) : error ? (
          <Alert
            severity="error"
            icon={<ErrorOutlineIcon fontSize="inherit" />}
            sx={{ mb: 4 }}
          >
            {error.message ||
              "Failed to load products. Please try again later."}
          </Alert>
        ) : displayedProducts.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 2,
              bgcolor: "grey.50",
              borderRadius: 2,
            }}
          >
            <Box sx={{ fontSize: "4rem", mb: 2 }}>🔍</Box>
            <Typography variant="h5" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We couldn't find any products matching your criteria.
            </Typography>
            {searchQuery && (
              <Chip
                label="Clear search"
                onClick={() => setSearchQuery("")}
                sx={{ mt: 2 }}
              />
            )}
          </Box>
        ) : (
          <>
            <div className={styles.mainProducts}>
              {displayedProducts.map((product) => (
                <MuiProductLayout
                  key={product._id}
                  data={product}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default function Page() {
  return <PageContent />;
}
