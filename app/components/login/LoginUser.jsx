import React from "react";
import styles from "./loginStyles.module.scss";

const LoginUser = () => {
  return (
    <div className={styles.loginMainLayout}>
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-white "
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              placeholder="name@mail.com"
              required=""
            />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              required=""
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#db2cff] hover:bg-[#9f32b4] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
