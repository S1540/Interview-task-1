"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Paper,
  Rating,
  Chip,
  Button,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Box className="text-center">
          <CircularProgress size={50} />
          <p className="text-gray-600 mt-4">Loading...</p>
        </Box>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Paper className="p-8 text-center">
          <p className="text-gray-600 text-lg mb-4">Product not found</p>
          <Link href="/products">
            <Button variant="contained">Back to Products</Button>
          </Link>
        </Paper>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/products">
          <Button variant="outlined" className="!mb-6">
            ← Back
          </Button>
        </Link>

        <Paper elevation={2} className="overflow-hidden">
          <Grid container>
            {/* Image Section */}
            <Grid item xs={12} md={5}>
              <Box className="h-96 bg-white flex items-center justify-center p-6 border-r border-gray-100">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </Box>
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={7}>
              <Box className="p-8">
                {/* Category */}
                <Chip
                  label={product.category}
                  size="small"
                  className="!mb-3 !capitalize !bg-indigo-100 !text-indigo-700"
                />

                {/* Title */}
                <Typography variant="h4" className="!font-bold !mb-3">
                  {product.title}
                </Typography>

                {/* Brand */}
                {product.brand && (
                  <Typography variant="body2" className="!text-gray-500 !mb-4">
                    Brand:{" "}
                    <span className="!font-semibold">{product.brand}</span>
                  </Typography>
                )}

                {/* Rating */}
                <Box className="flex items-center gap-2 mb-4">
                  <Rating value={product.rating} precision={0.1} readOnly />
                  <span className="text-gray-600">({product.rating})</span>
                </Box>

                {/* Description */}
                <Typography
                  variant="body1"
                  className="!text-gray-700 !mb-6 !leading-relaxed"
                >
                  {product.description}
                </Typography>

                {/* Price */}
                <Typography
                  variant="h3"
                  className="!font-bold !text-indigo-600 !mb-4"
                >
                  ${product.price}
                </Typography>

                {/* Stock Info */}
                <Box className="flex gap-4 mb-6">
                  <Box className="flex-1 bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500 mb-1">Stock</p>
                    <p className="font-bold text-gray-900">
                      {product.stock} units
                    </p>
                  </Box>
                  <Box className="flex-1 bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500 mb-1">Discount</p>
                    <p className="font-bold text-green-600">
                      {product.discountPercentage}% OFF
                    </p>
                  </Box>
                </Box>

                {/* Buttons */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      className="!bg-indigo-600 hover:!bg-indigo-700"
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="outlined"
                      fullWidth
                      size="large"
                      className="!border-indigo-600 !text-indigo-600"
                    >
                      Buy Now
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}
