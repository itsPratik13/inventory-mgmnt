"use client";
import CardExpenseSummary from "@/components/CardExpenseSummary";
import CardPopularProducts from "@/components/CardPopularProducts";
import CardPurchaseSummary from "@/components/CardPurchaseSummary";
import CardSalesSummary from "@/components/CardSalesSummary";
import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />{" "}
      {/* <div className='row-span-3 xl:row-span-6 bg-amber-300'></div> */}
      <CardPurchaseSummary />
      {/* <div className='row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-amber-300'></div> */}
      {/* <div className="row-span-3 bg-amber-300"></div> */}
      <CardExpenseSummary/>
      <div className="md:row-span-1 xl:row-span-2 bg-amber-300"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-amber-300"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-amber-300"></div>
    </div>
  );
};

export default Dashboard;
