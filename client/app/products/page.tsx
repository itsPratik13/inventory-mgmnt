"use client";

import React, { useState } from "react";
import { useGetProductsQuery } from "../state/api";
import { SearchIcon } from "lucide-react";

import Header from "@/components/Header";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModelOpen,setIsModalOpen]=useState(false);
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-4xl font-bold animate-pulse text-white">
        Loading...
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="flex h-full items-center justify-center text-4xl font-bold text-red-600">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* Search bar centered */}
      <div className="mb-6 flex justify-center">
        <div className="flex items-center border-2 border-gray-200 rounded w-[220px] sm:w-[260px] md:w-[360px] lg:w-[420px]">
          <SearchIcon className="w-5 h-5 m-2 text-gray-500" />
          <input
            type="text"
            className="w-full py-2 px-4 rounded outline-none"
            placeholder="Search products"
            aria-label="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* header*/}
      <div className="flex justify-between items-center mb-6">
      <Header name="Products" />
      <button className="flex items-center font-bold py-2  bg-zinc-900 text-white
 border border-zinc-800  hover:bg-zinc-800
 focus:bg-zinc-800
 focus:outline-none
 focus:ring-2 focus:ring-indigo-500/20 rounded px-4 cursor-pointer" onClick={()=>setIsModalOpen(true)}> Add Product</button>
      </div>
     
      {/* Products List */}
    </div>
  );
};

export default Products;
