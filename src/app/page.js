import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2md font-bold text-indigo-600">AuthApp</h1>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Home
              </Link>
              <Link
                href="/users"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Users
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Contact
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/login"
                className="text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 font-medium transition"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7md mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5md font-bold text-gray-900 mb-6">
            Welcome to Auth App
          </h1>
          <p className="text-md text-gray-600 mb-12 max-w-2md mx-auto">
            A simple authentication demo built with Next.js, Material UI,
            Zustand, and Tailwind CSS.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/admin/login"
              className="bg-indigo-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
            >
              Admin Login
            </Link>
            <Link
              href="/admin/dashboard"
              className="bg-white text-indigo-600 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-50 transition shadow-lg border-2 border-indigo-600"
            >
              Go to Dashboard
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            *Dashboard access requires authentication
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure Authentication
            </h3>
            <p className="text-gray-600">
              Advanced security measures to protect your data and credentials.
            </p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fast & Modern
            </h3>
            <p className="text-gray-600">
              Built with the latest technologies for optimal performance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Easy to Use
            </h3>
            <p className="text-gray-600">
              Simple and intuitive interface for seamless user experience.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-24 border-t">
        <div className="max-w-7md mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            © 2024 Auth App. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
