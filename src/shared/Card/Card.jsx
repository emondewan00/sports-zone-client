import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Success from "../../message/Success";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Card = ({ c }) => {
  const {
    _id,
    image,
    instructorEmail,
    instructorName,
    className,
    price,
    availableSeats,
  } = c || {};
  const { axiosSecure } = useAxios();
  const { currentUser } = useAuth();
  const [role, setRole] = useState({});

  const token = localStorage.getItem("access_token");
  useEffect(() => {
    fetch(
      `https://summer-camp-school-miremon5222-gmailcom.vercel.app/users/single/${currentUser?.email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRole(data[0]);
      })
      .catch((err) => {});
  }, [token, currentUser]);
  const selectHandler = async (classId) => {
    if (role === undefined) {
      return <Navigate to="/login" />;
    }
    const res = await axiosSecure.post("/selectedClasses", { classId });
    if (res.status === 200) {
      Success("success", "Class add as select");
    }
  };

  const disable =
    role?.role === "admin" ||
    role?.role === "instructor" ||
    availableSeats === 0;
  const color = availableSeats === 0 ? "bg-red-400" : "bg-base-100";
  return (
    <div className={`w-64 shadow-xl ${color}`}>
      <figure>
        <img
          src={image}
          className="h-[200px] w-full rounded-t object-cover"
          alt="class image"
        />
      </figure>
      <div className=" px-4 my-4  space-y-1 ">
        <h2 className="card-title font-serif">{className}</h2>
        <p className="text-md">Techer:{instructorName}</p>
        <p className="text-sm">Techer Email:{instructorEmail}</p>
        <ul className="flex justify-between ">
          <li className="text-md font-semibold">Price:${price}</li>
          <li>Av Seats:{availableSeats}</li>
        </ul>
        <div className="card-actions justify-end">
          <button
            disabled={disable}
            onClick={() => selectHandler(_id)}
            className="px-5 bg-base-200 py-2 font-semibold hover:bg-base-300 rounded"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
