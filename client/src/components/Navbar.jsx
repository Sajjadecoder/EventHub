"use client"

import { Button } from "@/components/ui/button.jsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Load user from localStorage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  useEffect(() => {
    console.log("User is: ",user)
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("accessToken")
    navigate("/") // Optionally redirect to home after logout
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EventHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/events"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Browse Events
            </Link>

            {user && (
              <>
                <Link to="/my-bookings" className="nav-link">
                  My Bookings
                </Link>
                <Link to="/create-event" className="nav-link">
                  Create Event
                </Link>

                {(user.role === "admin" || user.role === "event_creator") && (
                  <Link to="/manage-events" className="nav-link">
                    Manage Events
                  </Link>
                )}

                {user.role === "admin" && (
                  <Link to="/admin-dashboard" className="nav-link">
                    Admin Panel
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
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
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/my-bookings" className="w-full">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/my-events" className="w-full">My Events</Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem>
                      <Link to="/user-management" className="w-full">User Management</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <span className="text-xl">✕</span> : <span className="text-xl">☰</span>}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/events" className="mobile-link" onClick={toggleMobileMenu}>Browse Events</Link>

              {user && (
                <>
                  <Link to="/my-bookings" className="mobile-link" onClick={toggleMobileMenu}>My Bookings</Link>
                  <Link to="/create-event" className="mobile-link" onClick={toggleMobileMenu}>Create Event</Link>
                  <Link to="/my-events" className="mobile-link" onClick={toggleMobileMenu}>My Events</Link>

                  {(user.role === "admin" || user.role === "event_creator") && (
                    <Link to="/manage-events" className="mobile-link" onClick={toggleMobileMenu}>Manage Events</Link>
                  )}

                  {user.role === "admin" && (
                    <>
                      <Link to="/admin-dashboard" className="mobile-link" onClick={toggleMobileMenu}>Admin Panel</Link>
                      <Link to="/user-management" className="mobile-link" onClick={toggleMobileMenu}>User Management</Link>
                    </>
                  )}

                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <Link to="/profile" className="mobile-link" onClick={toggleMobileMenu}>Profile Settings</Link>
                  </div>
                </>
              )}

              <div className="border-t border-gray-200 pt-4 mt-4">
                {!user ? (
                  <div className="space-y-2">
                    <Link to="/login">
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                        Sign Up
                      </Button>
                    </Link>
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
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
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
