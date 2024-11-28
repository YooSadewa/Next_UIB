"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { use } from "react";

export default function ProductInfo(props: {
  params: Promise<{ productId: any; skuId: number }>;
}) {
  const params = use(props.params);
  const productId = params.productId;
  const skuId = params.skuId;
  const fetchProductDetails = async () => {
    const response = await axios.get(
      "https://sephora.p.rapidapi.com/us/products/v2/detail",
      {
        params: {
          productId: productId,
          preferedSku: skuId,
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
    queryKey: ["productInfo", productId, skuId],
    queryFn: fetchProductDetails,
    refetchOnWindowFocus: false,
  });

  console.log("data", data);

  if (error)
    return (
      <div className="text-red-500">Error loading product: {error.message}</div>
    );

  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="skeleton h-10 w-1/3 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {data?.productDetails.displayName}
              </h1>
            )}
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="skeleton h-[250px] w-[250px] bg-gray-200 rounded-lg mb-5"></div>
                <div className="skeleton h-8 w-1/4 bg-gray-200 rounded mb-2"></div>
                <div className="skeleton h-6 w-1/3 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <>
                <img
                  src={data?.currentSku.skuImages.imageUrl}
                  className="hidden aspect-[3/4] h-[250px] w-[250px] object-cover m-auto rounded-lg object-cover lg:block mb-5"
                />
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {data?.currentSku.salePrice}
                </p>
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      {data?.productDetails.reviews} reviews
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="skeleton h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="skeleton h-6 w-1/2 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {data?.quickLookDescription}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="skeleton h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="skeleton h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                  </div>
                ) : (
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {data?.currentSku?.highlights &&
                      Array.isArray(data.currentSku.highlights) &&
                      data.currentSku.highlights.map(
                        (highlight: any, index: any) => (
                          <div key={index}>
                            <li>{highlight.name}</li>
                          </div>
                        )
                      )}
                  </ul>
                )}
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="skeleton h-4 w-2/3 bg-gray-200 rounded"></div>
                    <div className="skeleton h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    {data?.seoMetaDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
