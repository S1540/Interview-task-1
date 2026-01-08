"use client";

import { Paper, Avatar, Chip, Divider } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Paper className="p-8 text-center">
          <p className="text-gray-600 text-lg mb-4">User not found</p>
          <Link
            href="/users"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to Users
          </Link>
        </Paper>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/users"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-6"
          >
            <span className="mr-2">←</span> Back to Users
          </Link>
          <Link
            href="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-6"
          >
            Back to Home <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-indigo-600 font-bold mb-2">
            User Details
          </h1>
          <p className="text-gray-500">Complete profile information</p>
        </div>

        {/* User Card */}
        <Paper elevation={3} className="overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-8 text-center">
            <Avatar className="!w-24 !h-24 !text-3xl !bg-white !text-indigo-600 mx-auto mb-4">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </Avatar>
            <h2 className="text-2xl font-bold text-white mb-1">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-indigo-100">{user.email}</p>
          </div>

          {/* User Information */}
          <div className="p-6">
            {/* Personal Info Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Full Name</span>
                  <span className="text-gray-900">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <Divider />

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Email</span>
                  <span className="text-gray-900">{user.email}</span>
                </div>
                <Divider />

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Phone</span>
                  <span className="text-gray-900">{user.phone}</span>
                </div>
                <Divider />

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Gender</span>
                  <Chip
                    label={user.gender}
                    size="small"
                    className="!bg-indigo-100 !text-indigo-700 !font-medium !capitalize"
                  />
                </div>
                <Divider />

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Age</span>
                  <span className="text-gray-900">{user.age} years</span>
                </div>
              </div>
            </div>

            {/* Company Info Section */}
            {user.company && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Company Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Company</span>
                    <span className="text-gray-900">{user.company.name}</span>
                  </div>
                  <Divider />

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">
                      Department
                    </span>
                    <span className="text-gray-900">
                      {user.company.department}
                    </span>
                  </div>
                  <Divider />

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Title</span>
                    <span className="text-gray-900">{user.company.title}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Address Section */}
            {user.address && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Address
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900">
                    {user.address.address}, {user.address.city}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {user.address.state}, {user.address.postalCode}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Paper>
      </div>
    </div>
  );
}
