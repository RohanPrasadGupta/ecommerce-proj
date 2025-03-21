import React, { useState } from "react";
import styles from "./categoriesStyles.module.scss";
import {
  Box,
  Tabs,
  Tab,
  Chip,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Drawer,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

function CatagoryNav({ setSelectCategory }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeTab, setActiveTab] = useState(0);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeSubcategories, setActiveSubcategories] = useState([]);

  const categories = [
    {
      title: "All Categories",
      icon: "🏠",
      types: [],
    },
    {
      title: "Fashion",
      icon: "👕",
      types: [
        { slug: "mens-shirts", name: "Men's Shirts" },
        { slug: "mens-shoes", name: "Men's Shoes" },
        { slug: "mens-watches", name: "Men's Watches" },
        { slug: "womens-bags", name: "Women's Bags" },
        { slug: "womens-dresses", name: "Women's Dresses" },
        { slug: "womens-jewellery", name: "Women's Jewelry" },
        { slug: "womens-shoes", name: "Women's Shoes" },
        { slug: "womens-watches", name: "Women's Watches" },
        { slug: "tops", name: "Tops" },
        { slug: "sunglasses", name: "Sunglasses" },
      ],
    },
    {
      title: "Beauty",
      icon: "💄",
      types: [
        { slug: "beauty", name: "Beauty" },
        { slug: "fragrances", name: "Fragrances" },
        { slug: "skin-care", name: "Skin Care" },
      ],
    },
    {
      title: "Electronics",
      icon: "📱",
      types: [
        { slug: "laptops", name: "Laptops" },
        { slug: "smartphones", name: "Smartphones" },
        { slug: "tablets", name: "Tablets" },
        { slug: "mobile-accessories", name: "Mobile Accessories" },
      ],
    },
    {
      title: "Home",
      icon: "🏡",
      types: [
        { slug: "furniture", name: "Furniture" },
        { slug: "home-decoration", name: "Home Decoration" },
        { slug: "kitchen-accessories", name: "Kitchen Accessories" },
      ],
    },
    {
      title: "Sports",
      icon: "🏀",
      types: [
        { slug: "sports-accessories", name: "Sports Accessories" },
        { slug: "motorcycle", name: "Motorcycle" },
        { slug: "vehicle", name: "Vehicle" },
      ],
    },
    {
      title: "Groceries",
      icon: "🥑",
      types: [{ slug: "groceries", name: "Groceries" }],
    },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 0) {
      handleReset();
    }
  };

  const handleChipClick = (slug) => {
    if (activeSubcategories.includes(slug)) {
      setActiveSubcategories(
        activeSubcategories.filter((item) => item !== slug)
      );
      setSelectCategory("all");
    } else {
      setActiveSubcategories([slug]);
      setSelectCategory(slug);
    }
  };

  const handleReset = () => {
    setActiveSubcategories([]);
    setActiveTab(0);
    setSelectCategory("all");
  };

  const toggleDrawer = (open) => {
    setMobileDrawerOpen(open);
  };

  const categoryContent = (
    <Box sx={{ width: "100%" }}>
      {!isMobile && (
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="category tabs"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 500,
                minHeight: 48,
                px: 2,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "primary.main",
                height: 3,
              },
            }}
          >
            {categories.map((category, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <span>{category.icon}</span>
                    <span>{category.title}</span>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab > 0 && (
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="text.primary"
                >
                  {categories[activeTab].title} Categories
                </Typography>
                {activeSubcategories.length > 0 && (
                  <Button
                    size="small"
                    startIcon={<AutorenewIcon />}
                    onClick={handleReset}
                    sx={{ textTransform: "none" }}
                  >
                    Reset
                  </Button>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                  "& .MuiChip-root": {
                    transition: "all 0.2s ease",
                  },
                  "& .MuiChip-root:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {categories[activeTab].types.map((type, index) => (
                  <motion.div
                    key={type.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Chip
                      label={type.name}
                      clickable
                      onClick={() => handleChipClick(type.slug)}
                      color={
                        activeSubcategories.includes(type.slug)
                          ? "primary"
                          : "default"
                      }
                      variant={
                        activeSubcategories.includes(type.slug)
                          ? "filled"
                          : "outlined"
                      }
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>
          )}

          {activeTab === 0 && (
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
                sx={{ mb: 2 }}
              >
                Browse by Category
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(6, 1fr)",
                  },
                  gap: 2,
                  "& .category-card": {
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      "& .category-icon": {
                        transform: "scale(1.1)",
                      },
                    },
                  },
                }}
              >
                {categories.slice(1).map((category, index) => (
                  <motion.div
                    key={index}
                    className="category-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setActiveTab(index + 1)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        bgcolor: "background.paper",
                      }}
                    >
                      <Box
                        className="category-icon"
                        sx={{
                          fontSize: "2rem",
                          mb: 1.5,
                          transition: "transform 0.2s ease",
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        textAlign="center"
                        fontWeight={500}
                      >
                        {category.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {category.types.length} items
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          )}
        </motion.div>
      </AnimatePresence>
    </Box>
  );

  const mobileFilterButton = isMobile && (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Tooltip title="Filter Products">
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggleDrawer(true)}
          startIcon={<FilterListIcon />}
          sx={{
            borderRadius: 8,
            boxShadow: 3,
            px: 2,
          }}
        >
          {activeSubcategories.length > 0 ? "Filters (1)" : "Filter"}
        </Button>
      </Tooltip>
    </Box>
  );

  return (
    <>
      {!isMobile && (
        <Box className={styles.categoryNavContainer}>{categoryContent}</Box>
      )}

      {mobileFilterButton}

      <Drawer
        anchor="bottom"
        open={mobileDrawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "80vh",
            pt: 1,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Categories</Typography>
            <IconButton onClick={() => toggleDrawer(false)} edge="end">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ px: 1, pb: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="category tabs mobile"
              sx={{
                mb: 3,
                "& .MuiTab-root": {
                  textTransform: "none",
                },
              }}
            >
              {categories.map((category, index) => (
                <Tab key={index} label={`${category.icon} ${category.title}`} />
              ))}
            </Tabs>

            {categoryContent}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default CatagoryNav;
