import React, { useState } from "react";
import { useGetDashboardMetricsQuery } from "@/app/state/api";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardSalesSummary = () => {
  const {
    data: dashboardMetrics,
    isLoading,
    error,
  } = useGetDashboardMetricsQuery();

  const salesData = dashboardMetrics?.salesSummary || [];
  const totalValue = salesData.reduce((acc, curr) => acc + curr.totalValue, 0);
  const changePercent =
    salesData.reduce((acc, curr, _, array) => {
      return acc + curr.changePercentage! / array.length;
    }, 0) || 0;

  const highestValueDate =
    salesData.reduce((acc, curr) => {
      return acc.totalValue > curr.totalValue ? acc : curr;
    }, salesData[0]) || 0;
    const [timeframe, setTimeFrame] = useState("daily");

    
  const filteredSalesData = React.useMemo(() => {
    if (!salesData.length) return [];

    if (timeframe === "daily") {
      return salesData;
    }

    if (timeframe === "weekly") {
      const map = new Map();

      salesData.forEach((item) => {
        const date = new Date(item.date);
        const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;

        map.set(week, {
          date: week,
          totalValue: (map.get(week)?.totalValue || 0) + item.totalValue,
        });
      });

      return Array.from(map.values());
    }

    if (timeframe === "monthly") {
      const map = new Map();

      salesData.forEach((item) => {
        const date = new Date(item.date);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

        map.set(key, {
          date: key,
          totalValue: (map.get(key)?.totalValue || 0) + item.totalValue,
        });
      });

      return Array.from(map.values());
    }

    return salesData;
  }, [salesData, timeframe]);

  
  if (error) {
    return <div className="m-5">Failed to fetch data</div>;
  }
  return (
    <div className="row-span-3 xl:row-span-6 bg-zinc-900 text-white  border border-zinc-800 rounded-lg flex flex-col justify-between">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-4xl font-bold  animate-pulse">
          Loading...
        </div>
      ) : (
        <>
          {/* header  */}
          <div>
            <h3 className="text-lg font-semibold mb-2 px-7 pt-5 text-center">
              Sales Summary
            </h3>
            <hr className="border-gray-500 hover:bg-gray-800" />
          </div>
          {/* body  */}
          <div>
            {/* title  */}
            <div className="flex justify-between items-center mb-6 px-7 ">
              <div className="text-lg font-medium mt-2">
                <p className="text-xs text-gray-400">Value</p>
                <span className="text-2xl font-bold">
                  ${" "}
                  {(totalValue / 1000000).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  m
                </span>
                <span className="text-green-500 text-sm ml-2">
                  <TrendingUp className="inline w-4 h-4 mr-1" stroke="currentColor" />
                  {changePercent.toFixed(2)}%
                </span>
              </div>
              <select
                className="bg-zinc-800"
                onChange={(e) => {
                  setTimeFrame(e.target.value);
                }}
              >
                {" "}
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            {/* chart / */}
            <ResponsiveContainer
              width="100%"
              height={350}
              className="px-7 pb-1"
            >
              <BarChart
                data={filteredSalesData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    if (timeframe === "monthly") return value;
                    if (timeframe === "weekly") return value;
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    return `$${(value / 1000000).toFixed(0)}m`;
                  }}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                  contentStyle={{ backgroundColor: "#000", border: "none", borderRadius: "5px" }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar
                  dataKey="totalValue"
                  fill="#3182ce"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* footer  */}
          <div>
            <hr />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
              <p>{salesData.length || 0} days</p>
              <p className="text-sm">
                Highest Sales Date:{" "}
                <span className="font-bold">
                  {highestValueDate
                    ? new Date(highestValueDate.date).toLocaleDateString()
                    : "NA"}
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSalesSummary;
