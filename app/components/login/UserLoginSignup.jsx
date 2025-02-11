"use client";
import React, { useEffect, useState } from "react";
import LoginUser from "./LoginUser";
import SignupUser from "./SignupUser";
import CloseIcon from "@mui/icons-material/Close";

const UserLoginSignup = ({ setOpen, setUser }) => {
  const [loginType, setLoginType] = useState("signin");

  useEffect(() => {
    // Fetch user details from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "5rem",
          backgroundColor: "#111827",
          height: "800px",
          width: "100%",
          gap: "10px",
          borderRadius: "24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "end" }}>
          <CloseIcon
            onClick={() => setOpen(false)}
            sx={{ color: "white", cursor: "pointer" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8rem",
            height: "100%",
          }}
        >
          <div className="w-full rounded-lg shadow border max-w-md bg-gray-800 border-gray-700">
            <div className=" p-6 space-x-4 text-white ">
              <button
                hidden={loginType === "signin"}
                className="bg-[#db2cff] hover:bg-[#9f32b4] px-4 py-2 rounded-full"
                onClick={() => setLoginType("signin")}
              >
                Sign In
              </button>
              <button
                hidden={loginType === "signup"}
                className="bg-[#db2cff] hover:bg-[#9f32b4] px-4 py-2 rounded-full"
                onClick={() => setLoginType("signup")}
              >
                Sign Up
              </button>
            </div>
            {loginType === "signin" ? (
              <LoginUser setUser={setUser} />
            ) : (
              <SignupUser setOpen={setOpen} />
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <img
              alt="signupLoginImage"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLoginSignup;
