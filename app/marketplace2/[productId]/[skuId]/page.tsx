"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  productId: string;
  currentSku: {
    skuId: number;
    salePrice: number;
    highlights: { name: string };
    alternateImage: { altText: any; imageUrl: any };
    skuImages: {
      imageUrl: any;
    };
  };
  productDetails: {
    displayName: string;
    reviews: string;
    longDescription: any;
  };
  seoMetaDescription: string;
  quickLookDescription: string;
}

const ProductPage = () => {
  const params = useParams();

  // params will be an object containing productId and skuId
  const productId = params.productId as string;
  const skuId = params.skuId as string;
  const [products, setProducts] = useState<Product>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId && skuId) {
      fetchProducts("shoes");
    }
  }, [productId, skuId]);

  const fetchProducts = async (query: string) => {
    setLoading(true);
    try {
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

      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!productId || !skuId) {
    return <div>Loading...</div>;
  }

  console.log("API Response:", products);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {products?.productDetails.displayName}
            </h1>
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <img
              src={products?.currentSku.skuImages.imageUrl}
              className="hidden aspect-[3/4] h-[250px] w-[250px] object-cover m-auto rounded-lg object-cover lg:block mb-5"
            />
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {products?.currentSku.salePrice}
            </p>
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <p className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {products?.productDetails.reviews} reviews
                </p>
              </div>
            </div>
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {products?.quickLookDescription}
                </p>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {products?.currentSku?.highlights &&
                    Array.isArray(products.currentSku.highlights) &&
                    products.currentSku.highlights.map((highlight) => (
                      <div key={highlight.id}>
                        <li>{highlight.name}</li>
                      </div>
                    ))}
                </ul>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  {products?.seoMetaDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
