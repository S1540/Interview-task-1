"use client";

import {
  Paper,
  Avatar,
  TextField,
  InputAdornment,
  ButtonGroup,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState, memo } from "react";
import { useUsersStore } from "../store/userStore";

//  Sirf UserCard ko memo kiya - baaki sab simple
const UserCard = memo(({ user }) => {
  return (
    <Link href={`/users/${user.id}`}>
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-md mb-2 border cursor-pointer hover:bg-gray-100 transition">
        <Avatar className="!bg-indigo-600">
          {user.firstName?.[0]}
          {user.lastName?.[0]}
        </Avatar>

        <div className="flex-1">
          <p className="font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </Link>
  );
});

UserCard.displayName = "UserCard";

// Main Component
export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { users, total, loading, fetchUsers } = useUsersStore();

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  // Fetch users from Zustand
  useEffect(() => {
    fetchUsers(currentPage, limit);
  }, [currentPage, fetchUsers]);

  // Search (current page only)
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-indigo-600 rounded"></div>
            <h1 className="text-3xl text-indigo-600 font-bold">
              Assignment 1b
            </h1>
          </div>
          <h2 className="text-2xl text-gray-700 font-semibold ml-5">
            Users List
          </h2>
        </div>

        <Paper elevation={2} className="p-6">
          {/* Search */}
          <div className="mb-6">
            <TextField
              fullWidth
              placeholder="Search users..."
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
          </div>

          {/* Users List -memo */}
          <div className="space-y-3">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading users...</p>
              </div>
            )}

            {!loading && filteredUsers.length === 0 && (
              <p className="text-center text-gray-500 py-6">No users found</p>
            )}

            {!loading &&
              filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
          </div>

          {/* Pagination */}
          {!loading && filteredUsers.length > 0 && (
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
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </Button>
              </ButtonGroup>
            </div>
          )}
        </Paper>
      </div>
    </div>
  );
}
