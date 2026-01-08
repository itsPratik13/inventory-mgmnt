"use client";

import {
  ExpenseByCategory,
  useGetExpensesByCategoryQuery,
} from "@/app/state/api";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategory) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategory) => {
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            amount: 0,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          };
        }
        acc[data.category].amount += amount;
        return acc;
      }, {});

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  const classNames = {
    label: "block text-sm font-medium text-zinc-400",
    input:
      "mt-1 block w-full rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600",
  };

  if (isLoading) {
    return (
      <div className=" flex-1 flex items-center justify-center text-4xl font-bold animate-pulse">
        Loading expenses...
      </div>
    );
  }

  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to fetch expenses
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* HEADER */}
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-zinc-400 text-center">
          A visual representation of expenses over time.
        </p>
      </div>

      {/* FILTERS + CHART */}
      <div className="flex flex-col xl:flex-row gap-4">
        {/* FILTER PANEL */}
        <div className="w-full xl:w-1/3 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Category and Date
          </h3>

          <div className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label className={classNames.label}>Category</label>
              <select
                className={classNames.input}
                defaultValue="All"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>

            {/* START DATE */}
            <div>
              <label className={classNames.label}>Start Date</label>
              <input
                type="date"
                className={classNames.input}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* END DATE */}
            <div>
              <label className={classNames.label}>End Date</label>
              <input
                type="date"
                className={classNames.input}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="flex-grow bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                dataKey="amount"
                label
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      index === activeIndex
                        ? "#2563eb"
                        : entry.color || "#52525b"
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#d4d4d8" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
