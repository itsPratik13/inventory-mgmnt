import { useGetDashboardMetricsQuery } from "@/app/state/api";

const CardPurchaseSummary = () => {
  const {
    data: dashboardMetrics,
    isLoading,
    error,
  } = useGetDashboardMetricsQuery();
  const purchasedData=dashboardMetrics?.purchaseSummary||[];
  return (
    <div className=" flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-zinc-900 text-white  border border-zinc-800 rounded-lg">
      CardPurchaseSummary
    </div> 
  );
};

export default CardPurchaseSummary;
