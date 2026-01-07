"use client";

import React, { useState } from "react";
import { useCreateProductMutation, useGetProductsQuery } from "../state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";

import Header from "@/components/Header";
import Rating from "@/components/Rating";
import CreateModal from "@/components/CreateModal";

type ProductFormData = {
  name: string;
  rating: number;
  stockQuantity: number;
  price: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };
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
        <button
          className="flex items-center font-bold py-2  bg-zinc-900 text-white border border-zinc-800  hover:bg-zinc-800 focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded px-4 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Create Product
        </button>
      </div>
      {/* product list  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-4xl font-bold animate-pulse text-white">
            Loading...
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                img
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-300">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-300">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* modal  */}
      <CreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
