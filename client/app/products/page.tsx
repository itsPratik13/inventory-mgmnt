"use client";

import React, { useState } from "react";
import { useCreateProductMutation, useGetProductsQuery } from "../state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";

import Header from "@/components/Header";
import Rating from "@/components/Rating";
import CreateModal from "@/components/CreateModal";
import Image from "next/image";

type ProductFormData = {
  name: string;
  rating: number;
  stockQuantity: number;
  price: number;
};

const ProductImages = [
  "/product1.png",
  "/product2.png",
  "/product3.png",
];

const RandomImage = () => {
  return ProductImages[Math.floor(Math.random() * ProductImages.length)];
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  const { data: products, isLoading, isError } = useGetProductsQuery();

  // Frontend search
  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="w-full text-white mx-auto pb-5">
      {/* Header */}
      <Header name="Products" />

      {/* Search bar */}
      <div className="mt-5 mb-6 flex justify-center">
        <div className="flex items-center border-2 border-zinc-800 rounded w-[220px] sm:w-[260px] md:w-[360px] lg:w-[420px] bg-zinc-900">
          <SearchIcon className="w-5 h-5 m-2 text-zinc-400" />
          <input
            type="text"
            className="w-full py-2 px-4 rounded outline-none bg-zinc-900 text-zinc-200 placeholder-zinc-500  "
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Create Product Button */}
      <div className="flex justify-end mb-6">
        <button
          className="flex items-center font-bold py-2 px-4 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 focus:ring-2 focus:ring-indigo-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Create Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => (
          <div
            key={product.productId}
            className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-md p-4 hover:bg-zinc-800/50 transition"
          >
            <div className="flex flex-col items-center">
              <Image
                src={RandomImage()}
                alt="product"
                height={100}
                width={100}
                className="rounded-md object-cover mb-3"
              />
              <h3 className="text-lg font-semibold text-zinc-200">
                {product.name}
              </h3>
              <p className="text-zinc-300">${product.price.toFixed(2)}</p>
              <div className="text-sm text-zinc-300">
                Stock: {product.stockQuantity}
              </div>
              {product.rating && (
                <div className="flex items-center mt-2">
                  <Rating rating={product.rating} />
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredProducts?.length === 0 && (
          <div className="col-span-full text-center text-zinc-400 mt-10">
            No products found.
          </div>
        )}
      </div>

      {/* Create Product Modal */}
      <CreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
