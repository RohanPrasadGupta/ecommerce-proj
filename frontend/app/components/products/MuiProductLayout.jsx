import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

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
  const maxCharDescription = (desc) => {
    if (desc.length > 100) {
      return desc.slice(0, 50) + "...";
    }
    return desc;
  };

  return (
    <Card
      sx={{
        width: 250,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={data.thumbnail}
          alt={data.title}
        />
        <CardContent sx={{ height: "100px" }}>
          <Typography gutterBottom sx={{ fontSize: "1rem" }} component="div">
            {data.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {maxCharDescription(data.description)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Rating
          name="half-rating"
          defaultValue={Math.floor(data.rating)}
          precision={0.5}
          readOnly
        />
        <Box sx={{ ml: 2 }}>{labels[Math.floor(data.rating)]}</Box>
      </CardActions>
    </Card>
  );
};

export default MuiProductLayout;
