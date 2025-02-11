import React from "react";
import Avatar from "@mui/material/Avatar";

const ProfilerContaier = ({ handleLogout }) => {
  return (
    <div>
      <button type="button" onClick={() => handleLogout()}>
        <Avatar src="/broken-image.jpg" />
      </button>
    </div>
  );
};

export default ProfilerContaier;
