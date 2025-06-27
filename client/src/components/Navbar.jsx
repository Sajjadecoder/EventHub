"use client"

import { Button } from "@/components/ui/button.jsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  // Mock user state - replace with actual auth state
  const [user, setUser] = useState(null) // null for guest, object for authenticated user
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Mock user data - replace with actual user data from your auth system
  // const user = {
  //   name: "John Doe",
  //   email: "john@example.com",
  //   role: "admin" // or "user"
  // }

  const handleLogin = () => {
    // Mock login - replace with actual login logic
    setUser({
      name: "John Doe",
      email: "john@example.com",
      role: "admin", // Change to "admin" to see admin features
    })
  }

  const handleLogout = () => {
    setUser(null)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EventHub</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Public Navigation */}
            <a
              href="/events"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Browse Events
            </a>

            {/* Authenticated User Navigation */}
            {user && (
              <>
                <a
                  href="/my-bookings"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  My Bookings
                </a>
                <a
                  href="/create-event"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Create Event
                </a>

                {/* Admin/Event Creator Navigation */}
                {(user.role === "admin" || user.role === "event_creator") && (
                  <a
                    href="/manage-events"
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Manage Events
                  </a>
                )}

                {/* Admin Only Navigation */}
                {user.role === "admin" && (
                  <a
                    href="/admin-dashboard"
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Admin Panel
                  </a>
                )}
              </>
            )}
          </div>

          {/* User Authentication Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              // Guest User Buttons
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <Link to={'/register'}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Sign Up
                </Button>
                </Link>
              </div>
            ) : (
              // Authenticated User Dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="text-gray-700 font-medium">{user.name}</span>
                    <span className="text-gray-400">▼</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-purple-600 font-medium capitalize">{user.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="/profile" className="w-full">
                      Profile Settings
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="/my-bookings" className="w-full">
                      My Bookings
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="/my-events" className="w-full">
                      My Events
                    </a>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <>
                      
                      <DropdownMenuItem className="cursor-pointer">
                        <a href="/user-management" className="w-full">
                          User Management
                        </a>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-purple-600 hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <span className="text-xl">✕</span> : <span className="text-xl">☰</span>}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Public Navigation */}
              <a
                href="/events"
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Events
              </a>

              {/* Authenticated User Navigation */}
              {user && (
                <>
                  <Link
                    href="/my-bookings"
                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <Link
                    href="/create-event"
                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Create Event
                  </Link>
                  <Link
                    href="/my-events"
                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Events
                  </Link>

                  {/* Admin/Event Creator Navigation */}
                  {(user.role === "admin" || user.role === "event_creator") && (
                    <a
                      href="/manage-events"
                      className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Manage Events
                    </a>
                  )}

                  {/* Admin Only Navigation */}
                  {user.role === "admin" && (
                    <>
                      <a
                        href="/admin-dashboard"
                        className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md text-base font-medium transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Panel
                      </a>
                      <a
                        href="/user-management"
                        className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md text-base font-medium transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        User Management
                      </a>
                    </>
                  )}

                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <a
                      href="/profile"
                      className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile Settings
                    </a>
                  </div>
                </>
              )}

              {/* Authentication Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {!user ? (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                      onClick={() => {
                        handleLogin()
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="px-3 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-xs text-purple-600 font-medium capitalize">{user.role}</p>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
