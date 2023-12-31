import React from "react";
import InstructorsCard from "../../shared/InstructorsCard/InstructorsCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { Helmet } from "react-helmet-async";
import Cards from "../../shared/cardLoading/Cards";

const Instructors = () => {
  const { axiosSecure } = useAxios();
  const {
    data = [],
    refetch,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/instructors");
      return res.data;
    },
  });

  let content = null;
  if (isLoading) {
    content = <Cards />;
  }
  if (isSuccess && isLoading !== true) {
    content = data.map((ins) => (
      <InstructorsCard key={ins._id} instructor={ins}>
        <button className="px-5 bg-base-200 py-2 font-semibold hover:bg-base-300 rounded">
          See My Class
        </button>
      </InstructorsCard>
    ));
  }
  return (
    <div className="my-10">
      <Helmet>
        <title>Instructors | Sports Zone</title>
      </Helmet>
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-3 mx-auto max-w-4xl gap-4">
        {content}
      </div>
    </div>
  );
};

export default Instructors;
