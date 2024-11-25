"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  product_id: number;
  product_title: string;
  product_description: string;
  product_photos: any;
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
        "https://real-time-product-search.p.rapidapi.com/search-v2",
        {
          params: {
            q: query,
            country: "us",
            language: "en",
            page: "1",
            limit: "12",
            sort_by: "BEST_MATCH",
            product_condition: "ANY",
          },
          headers: {
            "x-rapidapi-key":
              "00c82a3b37msh2413fc934c617ebp1fc451jsnee68149a12c7",
            "x-rapidapi-host": "real-time-product-search.p.rapidapi.com",
          },
        }
      );
      console.log("API Response:", response.data.data.products);
      setProducts(response.data.data.products);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">TokoPatu</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari produk..."
          className="flex-grow border rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
        >
          Cari
        </button>
      </form>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(products) &&
          products.map((product: Product) => (
            <div
              key={product.product_id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={product.product_photos[0]}
                alt={product.product_title}
                className="w-full h-[200px] object-contain"
              />
              <h1 className="font-semibold text-xl mb-2 text-center">
                {product.product_title}
              </h1>
              <p className="text-center h-[300px] overflow-auto">
                {product.product_description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
