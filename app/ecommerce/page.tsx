"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

export default function Ecommerce() {
  const getData = async () => {
    const response = await axios.get(
      "https://sephora.p.rapidapi.com/us/products/v2/list",
      {
        params: {
          pageSize: "1",
          currentPage: "1",
          categoryId: "cat1080037",
        },
        headers: {
          "x-rapidapi-key":
            "00c82a3b37msh2413fc934c617ebp1fc451jsnee68149a12c7",
          "x-rapidapi-host": "sephora.p.rapidapi.com",
        },
      }
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["todo"],
    queryFn: getData,
    refetchOnWindowFocus: false
  });

  if (error) return <div>Error : {error.message}</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {isLoading ? (
            // Skeleton loading state
            <>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="skeleton aspect-square w-full rounded-lg bg-gray-200 xl:aspect-[7/8]"></div>
                  <div className="mt-4 h-4 w-3/4 skeleton bg-gray-200"></div>
                  <div className="mt-1 h-6 w-1/4 skeleton bg-gray-200"></div>
                </div>
              ))}
            </>
          ) : (
            // Actual content
            data?.products?.map((product: any) => (
              <Link
                key={product.productId}
                href={`/ecommerce/${product.productId}/${product.currentSku.skuId}`}
                className="group"
              >
                <img
                  alt={product.displayName}
                  src={product.heroImage}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                />
                <h3 className="mt-4 text-sm text-gray-700">
                  {product.displayName}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.currentSku.salePrice
                    ? product.currentSku.salePrice
                    : "N/A"}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
