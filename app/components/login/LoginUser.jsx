import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import styles from "./loginStyles.module.scss";
import Cookies from "js-cookie";

const LoginUser = ({ setUser, setOpen }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        "https://e-combackend-jbal.onrender.com/user/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        toast.error("Error logging in! Please try again.");
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (data?.status === "success" && data?.data?.token) {
        const { token, userDetails } = data.data;

        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userDetails));

        // Save token in cookies
        Cookies.set("token", token, { expires: 7, secure: true });

        // Update user state
        setUser(userDetails);
        setOpen(false);

        toast.success("Login successful!");
        console.log("User Data:", data);
      } else {
        toast.error("Login failed! No token received.");
      }
    },
    onError: () => {
      toast.error("Error logging in! Please try again.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className={styles.loginMainLayout}>
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@mail.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#db2cff] hover:bg-[#9f32b4] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
