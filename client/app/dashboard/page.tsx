"use client";
import CardExpenseSummary from "@/components/CardExpenseSummary";
import CardPopularProducts from "@/components/CardPopularProducts";
import CardPurchaseSummary from "@/components/CardPurchaseSummary";
import CardSalesSummary from "@/components/CardSalesSummary";
import StatCard from "@/components/StatCard";
import React from "react";
import {
  Package,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Tag,
} from "lucide-react";


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
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 March 2026"
        details={[
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Expenses",
            amount: "10.00",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 March 2026"
        details={[
          {
            title: "Dues",
            amount: "250.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Pending Orders",
            amount: "147",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 March 2026"
        details={[
          {
            title: "Sales",
            amount: "1000.00",
            changePercentage: 20,
            IconComponent: TrendingUp,
          },
          {
            title: "Discount",
            amount: "200.00",
            changePercentage: -10,
            IconComponent: TrendingDown,
          },
        ]}
      />
      
      
    </div>
  );
};

export default Dashboard;
