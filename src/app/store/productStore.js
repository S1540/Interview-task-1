import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  total: 0,
  loading: false,
  error: null,

  fetchProducts: async ({ page = 1, limit = 10, search = "" }) => {
    set({ loading: true, error: null });

    const skip = (page - 1) * limit;

    const url = search
      ? `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      set({
        products: data.products,
        total: data.total,
        loading: false,
      });
    } catch (err) {
      set({
        error: "Failed to fetch products",
        loading: false,
      });
    }
  },
}));
