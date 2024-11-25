"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Brand {
  brandValue: string;
}

export default function Home() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "https://mobile-phone-specs-database.p.rapidapi.com/gsm/all-brands",
          {
            headers: {
              "X-RapidAPI-Key":
                "00c82a3b37msh2413fc934c617ebp1fc451jsnee68149a12c7",
            },
          }
        );
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Brand Handphone</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand: Brand) => (
          <div
            key={brand.brandValue}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg mb-2 text-center">
              {brand.brandValue}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
