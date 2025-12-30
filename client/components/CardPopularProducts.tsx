
import { useGetDashboardMetricsQuery } from "@/app/state/api";
import { ShoppingBag } from "lucide-react";
import Rating from "./Rating";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading ,error} = useGetDashboardMetricsQuery();
  return (
    <div className="row-span-3 xl:row-span-6  bg-zinc-900 text-white  border border-zinc-800 rounded-lg   flex flex-col">
      {isLoading ? (
        <div className=" flex-1 flex items-center justify-center text-4xl font-bold animate-pulse"> Loading... </div>
      ) : (
        <>
        <h3 className="text-lg font-semibold px-7 pt-5 pb-2 text-center">
          Popular products
        </h3>
        <hr className="border-gray-500 hover:bg-gray-800"/>
        {dashboardMetrics?.popularProducts.length===0 &&(
          <h1 className="text-bold">No popular products!</h1>
        )}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-zinc-600">
            {!error && dashboardMetrics?.popularProducts.map((product)=>(
              <div
              key={product.productId} className="flex items-center justify-between gap-3 px-5 py-7 border-b hover:bg-zinc-800">
                <div className="flex items-center gap-3">
                <div>img</div>
                <div className="flex flex-col justify-between gap-1">
                  <div className="text-white font-bold">{product.name}</div>
                  <div className="flex text-sm items-center">
                    <span className="text-xs">Rs. {product.price}</span>
                    <span className="mx-2">|</span>
                    <Rating rating={product.rating||0}/>
                  </div>

                </div>
              </div>
              {/* right side */}
              <div className="text-xs flex items-center">
                <button className="p-2 rounded-full">
                  <ShoppingBag className="w-4 h-4 items-center mb-2"/>
                  {Math.round(product.stockQuantity/1000)} k sold 
                </button>

              </div>
              </div>
            ))}

        </div>
        </>
    
      )}
    </div>
  );
};

export default CardPopularProducts;
