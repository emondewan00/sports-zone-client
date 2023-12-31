import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import GoogleLog from "../../shared/googleLOg/GoogleLog";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Success from "../../message/Success";
import { Helmet } from "react-helmet-async";

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [passErr, setPassErr] = useState("");
  const { emailAndPass, updateUser, currentUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const {
      password,
      conFirmPass,
      email,
      name,
      address,
      gender,
      phone,
      photo,
    } = data;
    if (password !== conFirmPass) {
      return setPassErr("password is not match");
    }
    emailAndPass(email, password)
      .then((res) => {
        updateUser(res.user, name, photo, address, phone, gender);
        axios
          .post(
            "http://localhost:4999/users",
            {
              name,
              address,
              gender,
              email,
              phone,
              photo,
            }
          )
          .then((res) => {
            console.log(res);
            Success("success", "Account created successfully!");
            navigate("/");
            localStorage.setItem("access_token", res.data.access_token);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        setPassErr(err.message);
        console.log(err);
      });
  };
  return (
    <>
      <Helmet>
        <title>Registration | Sports Zone</title>
      </Helmet>
      <div className=" md:h-[80vh]  px-4 md:px-0 mx-auto py-6  bg-[#1F2937] ">
        <div className=" bg-white/5 text-white max-w-3xl mx-auto shadow-md px-6 md:px-20 py-10">
          <h1 className="text-3xl text-center my-4 ">SingUp</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid  grid-cols-1 md:grid-cols-3 gap-4">
              <div className="">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="  p-2 outline-none w-full text-black"
                  name="name"
                  id="name"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="  p-2 outline-none w-full text-black"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  className="  p-2 outline-none w-full text-black"
                  id="gender"
                  defaultValue=""
                  {...register("gender", { required: true })}
                >
                  <option value="" disabled>
                    Pick One
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="  p-2 outline-none w-full text-black"
                  name="password"
                  id="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                    pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?]).{6,}$/,
                  })}
                />
              </div>
              <div className="">
                <label htmlFor="conFirmPass">Confirm Password</label>
                <input
                  type="password"
                  className="  p-2 outline-none w-full text-black"
                  name="conFirmPass"
                  {...register("conFirmPass", { required: true })}
                  id="conFirmPass"
                />
              </div>
              <div className="">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="  p-2 outline-none w-full text-black"
                  name="address"
                  id="address"
                  {...register("address")}
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-x-4 justify-center  my-4">
              <div>
                <label htmlFor="photo">Photo URL</label>
                <input
                  type="url"
                  className="  p-2 outline-none w-full text-black"
                  {...register("photo", { required: true })}
                  name="photo"
                  id="photo"
                />
              </div>
              <div>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="number"
                  placeholder="to create give me unique number"
                  className="  p-2 outline-none w-full text-black"
                  {...register("phone", { minLength: 11, maxLength: 11 })}
                  name="phone"
                  id="phone"
                />
              </div>
            </div>
            <div className="text-center ">
              <input
                className="btn px-10 tracking-wider"
                type="submit"
                value="Submit"
              />
              <h1 className="text-xl text-center my-4  text-red-600">
                {passErr}
              </h1>
            </div>
          </form>
          <div className="divider"> or</div>
          <Link to="/login">All ready have an account ?</Link> <GoogleLog />
        </div>
      </div>
    </>
  );
};

export default Registration;
