import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces";
import { signIn } from "./utilities";

const Login: React.FC = () => {
  const [dto, setDto] = useState<IUser>({
    email: "",
    password: "",
  });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(dto).then((data) => {
      if (data) {
        alert("Sign in successful!");
      } else {
        alert("Sign in failed");
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4 m-4 border rounded-lg border-cus-blue w-1/3">
      <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
        <div className="flex justify-between items-center">
          <label htmlFor="email" className="text-xl">
            Email:{" "}
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="border rounded-lg border-cus-blue p-2"
            onInput={(e) =>
              setDto((prev) => {
                const temp = prev;
                temp.email = (e.target as HTMLInputElement).value;
                return temp;
              })
            }
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="text-xl">
            Password:{" "}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded-lg border-cus-blue p-2"
            onInput={(e) =>
              setDto((prev) => {
                const temp = prev;
                temp.password = (e.target as HTMLInputElement).value;
                return temp;
              })
            }
          />
        </div>
        <button type="submit">Sign In</button>
        <span>
          Don't have an account? <Link to="/signup">Sign up </Link>here!
        </span>
      </form>
    </div>
  );
};

export default Login;
