import React from "react";
import Avatar from "@mui/material/Avatar";
import GlobalButton from "../Buttons/GlobalButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const ProfilerContaier = ({ handleLogout }) => {
  return (
    <div>
      <GlobalButton
        icon={<AccountCircleOutlinedIcon />}
        text=""
        onClick={() => handleLogout()}
        type="button"
        height="32px"
        width="32px"
      />
    </div>
  );
};

export default ProfilerContaier;
