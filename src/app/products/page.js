"use client";

import {
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Rating,
  Chip,
  ButtonGroup,
  Button,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { products, total, loading, fetchProducts } = useProductStore();

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  // Fetch products (API-based search + pagination)
  useEffect(() => {
    fetchProducts({
      page: currentPage,
      limit,
      search: searchQuery,
    });
  }, [currentPage, searchQuery, fetchProducts]);

  // Reset page when search or category changes (UX fix)
  useEffect(() => {
    setCurrentPage(1, searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  // Categories (derived from current data)
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Category filter (frontend)
  const finalProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-indigo-600 rounded"></div>
            <h1 className="text-3xl text-indigo-600 font-bold">
              Assignment 1c
            </h1>
          </div>
          <h2 className="text-2xl text-gray-700 font-semibold ml-5">
            Products
          </h2>
        </div>

        <Paper elevation={2} className="p-6 mb-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Search */}
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">🔍</InputAdornment>
                ),
              }}
            />

            {/* Category */}
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-12">
              <CircularProgress />
            </div>
          )}

          {/* Products Grid */}
          {!loading && (
            <>
              <p className="text-gray-600 mb-4">
                Showing{" "}
                <span className="font-semibold">{finalProducts.length}</span>{" "}
                products
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {finalProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="bg-white rounded-lg border hover:shadow-lg transition cursor-pointer">
                      {/* Image */}
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        <Chip
                          label={product.category}
                          size="small"
                          className="!absolute !top-2 !right-2 !bg-white"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">
                          {product.title}
                        </h3>

                        <Rating
                          value={product.rating}
                          precision={0.1}
                          size="small"
                          readOnly
                        />

                        <div className="flex justify-between mt-2">
                          <p className="font-bold text-indigo-600">
                            ${product.price}
                          </p>
                          <span className="text-sm text-gray-500">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* No Data */}
              {finalProducts.length === 0 && (
                <p className="text-center text-gray-500 py-10">
                  No products found
                </p>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <ButtonGroup variant="contained">
                  <Button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Prev
                  </Button>

                  <Button disabled>
                    {currentPage} / {totalPages}
                  </Button>

                  <Button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </ButtonGroup>
              </div>
            </>
          )}
        </Paper>
      </div>
    </div>
  );
}
