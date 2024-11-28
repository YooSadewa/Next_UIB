"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  productId: any;
  displayName: string;
  brandName: string;
  heroImage: any;
  altImage: any;
  currentSku: { salePrice: number; skuId: number };
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Awalnya kosong

  useEffect(() => {
    fetchProducts("shoes");
  }, []);

  const fetchProducts = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://sephora.p.rapidapi.com/us/products/v2/list",
        {
          params: {
            pageSize: "2",
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
      console.log("API Response:", response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProducts(searchQuery || "shoes");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a
              key={product.productId}
              href={`/marketplace2/${product.productId}/${product.currentSku.skuId}`}
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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
