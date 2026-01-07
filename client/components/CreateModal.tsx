"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "./Header";

type ProductData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type createProductModal = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductData) => void;
};

const CreateModal = ({ isOpen, onClose, onCreate }: createProductModal) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const labelClasses = "block text-sm font-medium text-zinc-300 mb-2";
  const inputCssStyles =
    "block w-full mb-3 rounded-md border border-zinc-800 bg-zinc-900 p-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600";

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-96 rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-xl ">
        <Header name="Create New Product" />

        <form onSubmit={handleSubmit} className="mt-4">
          {/* product name  */}
          <label className={labelClasses}>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />
          {/* price  */}
          <label className={labelClasses}>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter Product Price"
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyles}
            required
          />
          {/* stock quantity  */}
          <label className={labelClasses}>Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Enter Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCssStyles}
            required
          />
          {/* rating  */}
          <label className={labelClasses}>Product Rating</label>
          <input
            type="number"
            name="rating"
            placeholder="Enter Product Rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputCssStyles}
            required
          />
          {/* actions  */}
          <button
            type="submit"
            className="px-4 py-2 bg-zinc-900 text-white border border-zinc-800  hover:bg-zinc-700  focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded cursor-pointer mt-2"
          >
            Create
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-zinc-900 text-white border border-zinc-800  hover:bg-zinc-700  
focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded cursor-pointer mt-2 ml-3"
           onClick={onClose}
           >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
