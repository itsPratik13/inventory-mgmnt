
import { useGetDashboardMetricsQuery } from "@/app/state/api";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  return (
    <div className="row-span-3 xl:row-span-6  bg-zinc-900 text-white  border border-zinc-800 rounded-lg  hover:bg-zinc-800">
      {isLoading ? (
        <div className="m-5"> ....Loading </div>
      ) : (
        <>
        <h3 className="text-lg font-semibold px-7 pt-5 pb-2 text-center">
          Popular products
        </h3>
        <hr className="border-gray-500 hover:bg-gray-800"/>
        <div className="overflow-auto h-full">
            

        </div>
        </>
    
      )}
    </div>
  );
};

export default CardPopularProducts;
