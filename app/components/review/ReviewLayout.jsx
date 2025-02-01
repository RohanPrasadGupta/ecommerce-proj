import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Rating from "@mui/material/Rating";

const ReviewLayout = ({ data }) => {
  //   console.log(data);

  const hideUserNameFunction = (name) => {
    if (name.length > 4) {
      return name.slice(0, 10) + "...";
    }
    return name;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "10px",
        border: "1px solid black",
        padding: "10px",
        borderRadius: "10px",
        marginTop: "10px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          {data.reviewerName[0]}
        </Avatar>
        <p style={{ fontWeight: "bold" }}>{data.reviewerName}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <p>({data?.rating})</p>
          <Rating
            name="half-rating"
            defaultValue={Math.floor(data.rating)}
            precision={0.5}
            readOnly
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginLeft: "10px",
        }}
      >
        <p>{data?.comment}</p>
      </div>
    </div>
  );
};

export default ReviewLayout;
