import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces";
import { signIn } from "./utilities";

const Login: React.FC = () => {
  const [dto, setDto] = useState<IUser>({
    email: "",
    password: "",
  });
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await signIn(dto);
    if (data) {
      alert("Sign in successful!");
    }
  };

  return (
    <div className="flex justify-between w-full h-[90vh]">
      <div className="flex flex-col items-center justify-center gap-8 w-2/5">
        <div className="w-3/5">
          <h1 className="text-4xl font-bold mb-2">Sign in</h1>
          <p className="text-gray-400">
            Sign in to continue using the features of CUS.
          </p>
        </div>
        <form className="flex flex-col gap-4 w-3/5" onSubmit={handleSignIn}>
          <div className="mx-auto w-full">
            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                  onInput={(e) =>
                    setDto((prev) => {
                      const temp = prev;
                      temp.email = (e.target as HTMLInputElement).value;
                      return temp;
                    })
                  }
                />
                <label
                  htmlFor="email"
                  className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
                >
                  Email
                </label>
              </div>
            </div>
          </div>
          <div className="mx-auto w-full">
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder=" "
                  className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                  onInput={(e) =>
                    setDto((prev) => {
                      const temp = prev;
                      const passwordInput = (e.target as HTMLInputElement)
                        .value;
                      temp.password = passwordInput;

                      return temp;
                    })
                  }
                />
                <label
                  htmlFor="password"
                  className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
                >
                  Password
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="keepLoggedIn"
              id="keepLoggedIn"
              className="h-4 w-4"
              onInput={() => setKeepLoggedIn((prev) => !prev)}
            />
            <label htmlFor="keepLoggedIn" className="text-gray-400">
              Keep me logged in
            </label>
          </div>
          <button
            className="w-full border rounded-lg bg-[#367aff] text-white p-3 hover:bg-[#1e4aff] transition-all"
            type="submit"
          >
            Sign In
          </button>
          <div className="">
            <span className="text-gray-400">Need an account? </span>
            <Link
              to="/signup"
              className="text-[#367aff] underline underline-offset-4 font-medium "
            >
              Create one
            </Link>
          </div>
        </form>
      </div>
      <img src="/broadway.png" alt="broadway" className="bg-cover w-3/5" />
    </div>
  );
};

export default Login;
