import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const MuiProductLayout = ({ data }) => {
  const router = useRouter();
  const maxCharDescription = (desc) => {
    if (desc.length > 100) {
      return desc.slice(0, 50) + "...";
    }
    return desc;
  };

  const handleClick = (productId) => {
    router.push(`/pages/productDetail?id=${productId}`);
  };

  const givenPrice = data.price - (data.price * data.discountPercentage) / 100;

  return (
    <Card
      sx={{
        width: 250,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        "&:hover": {
          boxShadow:
            "0px 6px 10px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.12)",
        },
      }}
      onClick={() => handleClick(data._id)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%"
          image={data.thumbnail}
          alt={data.title}
        />
      </CardActionArea>
      <CardContent sx={{ height: "100px" }}>
        <Typography gutterBottom sx={{ fontSize: "1rem" }} component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {maxCharDescription(data.description)}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Rating
          name="half-rating"
          defaultValue={Math.floor(data.rating)}
          precision={0.5}
          readOnly
        />
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Box sx={{ ml: 2, color: "green", fontWeight: "bold" }}>
            ${givenPrice.toFixed(2)}
          </Box>
        </div>
      </CardActions>
    </Card>
  );
};

export default MuiProductLayout;
