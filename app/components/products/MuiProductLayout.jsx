import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  width: 280,
  height: 420,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 16px 30px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.08)",
  },
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: 12,
  right: 12,
  backgroundColor: theme.palette.error.main,
  color: "white",
  fontWeight: "bold",
  boxShadow: "0 2px 8px rgba(244, 67, 54, 0.3)",
}));

const CategoryBadge = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: 12,
  left: 12,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "white",
  fontSize: "0.75rem",
}));

const ProductImageContainer = styled(CardMedia)(({ theme }) => ({
  height: 200,
  backgroundSize: "contain",
  backgroundColor: "#f9f9f9",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

const MuiProductLayout = ({ data }) => {
  const router = useRouter();

  const {
    _id,
    title = "Product Title",
    description = "No description available",
    thumbnail = "https://placehold.co/400x300?text=No+Image",
    price = 0,
    discountPercentage = 0,
    rating = 0,
    category = "",
    stock = 0,
  } = data || {};

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  const handleClick = (productId) => {
    router.push(`/pages/productDetail?id=${productId}`);
  };

  const originalPrice = price;
  const discountedPrice = price - (price * discountPercentage) / 100;
  const hasDiscount = discountPercentage > 0;

  const isLowStock = stock > 0 && stock < 5;
  const isOutOfStock = stock === 0;

  return (
    <StyledCard elevation={2}>
      {hasDiscount && (
        <DiscountBadge
          label={`${Math.round(discountPercentage)}% OFF`}
          size="small"
        />
      )}

      {category && (
        <CategoryBadge label={category} size="small" variant="outlined" />
      )}

      <CardActionArea onClick={() => handleClick(_id)}>
        <ProductImageContainer component="img" image={thumbnail} alt={title} />

        <CardContent sx={{ flexGrow: 1, pt: 2, pb: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              lineHeight: 1.3,
              mb: 1,
              height: "2.6rem",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {truncateText(title, 50)}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: "3rem",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              mb: 1,
            }}
          >
            {truncateText(description, 45)}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions
        sx={{
          px: 2,
          pb: 2,
          pt: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", width: "100%", mb: 1 }}
        >
          <Rating
            name="read-only"
            value={rating}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: 0.5, fontSize: "0.75rem" }}
          >
            ({rating.toFixed(1)})
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            {hasDiscount && (
              <Typography
                component="span"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                  fontSize: "0.85rem",
                  mr: 1,
                }}
              >
                ${originalPrice.toFixed(2)}
              </Typography>
            )}
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
                color: hasDiscount ? "error.main" : "primary.main",
                fontSize: "1.1rem",
              }}
            >
              ${discountedPrice.toFixed(2)}
            </Typography>
          </Box>

          {/* Stock indicator */}
          <Box>
            {isOutOfStock ? (
              <Chip
                label="Out of stock"
                size="small"
                color="default"
                sx={{
                  backgroundColor: "rgba(0,0,0,0.08)",
                  fontSize: "0.7rem",
                  height: 24,
                }}
              />
            ) : isLowStock ? (
              <Chip
                label={`Only ${stock} left`}
                size="small"
                color="warning"
                sx={{ fontSize: "0.7rem", height: 24 }}
              />
            ) : (
              <Chip
                label="In stock"
                size="small"
                color="success"
                sx={{ fontSize: "0.7rem", height: 24 }}
              />
            )}
          </Box>
        </Box>
      </CardActions>
    </StyledCard>
  );
};

export default MuiProductLayout;
