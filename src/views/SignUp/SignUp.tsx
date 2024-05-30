import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "./utilities/index";
import { IUser } from "../../interfaces";

const Login: React.FC = () => {
  const [dto, setDto] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    dob: new Date(),
    gender: 1,
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (dto.password !== passwordConfirmation) {
      alert("Password do not match");
    } else {
      signUp(dto).then((data) => {
        if (data.status !== 201) {
          alert("Sign up failed");
        } else {
          alert("Sign up successful!");
        }
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4 m-4 border rounded-lg border-cus-blue w-1/3">
      <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
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
        <div className="flex justify-between items-center">
          <label htmlFor="passwordConfirmation" className="text-xl">
            Confirm Password:{" "}
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            className="border rounded-lg border-cus-blue p-2"
            onInput={(e) =>
              setPasswordConfirmation((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="name" className="text-xl">
            Name:{" "}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border rounded-lg border-cus-blue p-2"
            onInput={(e) =>
              setDto((prev) => {
                const temp = prev;
                temp.name = (e.target as HTMLInputElement).value;
                return temp;
              })
            }
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="gender" className="text-xl">
            Gender:{" "}
          </label>
          <select
            onChange={(e) =>
              setDto((prev) => {
                const temp = prev;
                temp.gender = Number(e.target.value);
                return temp;
              })
            }
          >
            <option value="1" selected>
              Male
            </option>
            <option value="2">Female</option>
            <option value="3">Others</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="dateOfBirth" className="text-xl">
            Date of Birth:{" "}
          </label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className="border rounded-lg border-cus-blue p-2"
            onInput={(e) =>
              setDto((prev) => {
                const temp = prev;
                temp.dob = new Date((e.target as HTMLInputElement).value);
                return temp;
              })
            }
          />
        </div>
        <button type="submit">Sign Up</button>
        <span>
          <Link to="/signin">Sign in</Link> to your account
        </span>
      </form>
    </div>
  );
};

export default Login;
