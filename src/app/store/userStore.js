import { create } from "zustand";

export const useUsersStore = create((set) => ({
  users: [],
  total: 0,
  loading: false,
  error: null,

  fetchUsers: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`
      );
      const data = await res.json();

      set({
        users: data.users,
        total: 30, // assignment ke liye fixed
        loading: false,
      });
    } catch (err) {
      set({
        error: "Failed to fetch users",
        loading: false,
      });
    }
  },
}));
