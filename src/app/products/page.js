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
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
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

  // Fetch products (API-based search orr pagination)
  useEffect(() => {
    fetchProducts({
      page: currentPage,
      limit,
      search: searchQuery,
    });
  }, [currentPage, searchQuery, fetchProducts]);

  // Reset page on search
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
          <Grid container spacing={3} className="mb-6">
            {/* Search */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Loading */}
          {loading && (
            <Box className="flex justify-center py-12">
              <CircularProgress size={50} />
            </Box>
          )}

          {/* Products Grid */}
          {!loading && (
            <>
              <Typography variant="body1" className="!text-gray-600 !mb-4">
                Showing{" "}
                <span className="font-semibold">{finalProducts.length}</span>{" "}
                products
              </Typography>

              <Grid container spacing={3}>
                {finalProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Link
                      href={`/products/${product.id}`}
                      className="no-underline"
                    >
                      <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col">
                        {/* Image - Fixed Height */}
                        <Box className="relative overflow-hidden h-64 bg-gray-100 flex items-center justify-center">
                          <CardMedia
                            component="img"
                            image={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                          />
                          <Chip
                            label={product.category}
                            size="small"
                            className="!absolute !top-3 !right-3 !bg-white !text-gray-700 !font-medium !capitalize !shadow-md"
                          />
                        </Box>

                        {/* Info */}
                        <CardContent className="flex-1 flex flex-col">
                          <Typography
                            variant="h6"
                            className="!font-semibold !text-gray-900 !mb-2 !line-clamp-2 !min-h-14 group-hover:!text-indigo-600 transition-colors"
                          >
                            {product.title}
                          </Typography>

                          <Box className="flex items-center gap-2 mb-3">
                            <Rating
                              value={product.rating}
                              precision={0.1}
                              size="small"
                              readOnly
                            />
                            <Typography
                              variant="caption"
                              className="!text-gray-500"
                            >
                              ({product.rating})
                            </Typography>
                          </Box>

                          <Box className="flex justify-between items-center mt-auto">
                            <Typography
                              variant="h5"
                              className="!font-bold !text-indigo-600"
                            >
                              ${product.price}
                            </Typography>
                            <Chip
                              label={product.category}
                              size="small"
                              className="!bg-indigo-50 !text-indigo-700 !capitalize !font-medium"
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>

              {/* No Data */}
              {finalProducts.length === 0 && (
                <Box className="text-center py-12">
                  <svg
                    className="w-20 h-20 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <Typography variant="h6" className="!text-gray-500 !mb-2">
                    No products found
                  </Typography>
                  <Typography variant="body2" className="!text-gray-400">
                    Try adjusting your search or filters
                  </Typography>
                </Box>
              )}

              {/* Pagination */}
              {finalProducts.length > 0 && (
                <Box className="flex justify-center mt-8">
                  <ButtonGroup variant="contained" size="large">
                    <Button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      Prev
                    </Button>

                    <Button disabled className="!min-w-32">
                      {currentPage} / {totalPages}
                    </Button>

                    <Button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </ButtonGroup>
                </Box>
              )}
            </>
          )}
        </Paper>
      </div>
    </div>
  );
}
