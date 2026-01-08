"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { Paper } from "@mui/material";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Route protection
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  // 📦 API call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between text-2xl font-bold">
        <div>
          <h1 className=" mb-6">Dashboard</h1>
        </div>

        <div>
          <Link href={"/"}>Back To Home</Link>
        </div>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <Paper key={item.id} className="p-4">
              <h2 className="font-bold text-blue-600 text-lg">{item.title}</h2>
              <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              <p className="mt-3 font-bold text-green-600">₹ {item.price}</p>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
}
