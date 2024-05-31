import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "./utilities/index";
import { IUser } from "../../interfaces";
import PasswordRuleWarning from "./components/PasswordRuleWarning";

const SignUp: React.FC = () => {
  const [dto, setDto] = useState<IUser>({
    email: "",
    password: "",
  });
  const [passwordRule, setPasswordRule] = useState({
    length: false,
    upper: false,
    number: false,
    match: false,
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dto.password !== passwordConfirmation) {
      alert("Password do not match");
    } else {
      const data = await signUp(dto);
      if (data) alert("Sign up successful");
    }
  };

  const checkPassword = () => {
    setPasswordRule({
      length: dto.password.length >= 8 || passwordConfirmation.length >= 8,
      upper:
        dto.password.match(/[A-Z]/) !== null ||
        passwordConfirmation.match(/[A-Z]/) !== null,
      number:
        dto.password.match(/[0-9]/) !== null ||
        passwordConfirmation.match(/[0-9]/) !== null,
      match:
        dto.password === passwordConfirmation &&
        dto.password !== "" &&
        passwordConfirmation !== "",
    });
  };

  return (
    <div className="flex justify-between w-full h-[90vh]">
      <div className="flex flex-col items-center justify-center gap-8 w-2/5">
        <div className="w-3/5">
          <h1 className="text-4xl font-bold mb-2">Sign up</h1>
          <p className="text-gray-400">
            Sign up and be a part of CUS community.
          </p>
        </div>
        <form className="flex flex-col gap-4 w-3/5" onSubmit={handleSignUp}>
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
                      checkPassword();
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
          <div className="mx-auto w-full">
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="passwordConfirmation"
                  placeholder=" "
                  className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                  onInput={(e) => {
                    const passwordInput = (e.target as HTMLInputElement).value;
                    setPasswordConfirmation(passwordInput);
                    checkPassword();
                  }}
                />
                <label
                  htmlFor="passwordConfirmation"
                  className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
                >
                  Confirm Password
                </label>
              </div>
            </div>
          </div>
          {dto.password.length > 0 || passwordConfirmation.length > 0 ? (
            <div>
              {Object.entries(passwordRule).map(([key, value]) => (
                <PasswordRuleWarning type={key} filled={value} />
              ))}
            </div>
          ) : null}
          <button
            className="w-full border rounded-lg bg-[#367aff] text-white p-3 hover:bg-[#1e4aff] transition-all"
            type="submit"
          >
            Sign Up
          </button>
          <div className="">
            <span className="text-gray-400">Already have an account? </span>
            <Link
              to="/signin"
              className="text-[#367aff] underline underline-offset-4 font-medium "
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
      <img src="/broadway.png" alt="broadway" className="bg-cover w-3/5" />
    </div>
  );
};

export default SignUp;
