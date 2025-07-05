"use client"

import { Button } from "@/components/ui/button.jsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      )

      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("accessToken")
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message)
      alert("Logout failed.")
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-gray-900 shadow-lg border-b border-gray-800 sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-white">EventHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/events"
              className="text-gray-300 hover:text-purple-400 px-3 py-2 duration-200"
            >
              Browse Events
            </Link>

            {user && (
              <>
                <Link to="/my-bookings" className="text-gray-300 hover:text-purple-400">
                  My Bookings
                </Link>

                {(user.role === "admin" || user.role === "event_creator") && (
                  <>
                    <Link to="/create-event" className="text-gray-300 hover:text-purple-400">
                      Create Event
                    </Link>
                    <Link to="/manage-events" className="text-gray-300 hover:text-purple-400">
                      Manage Events
                    </Link>
                  </>
                )}

              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-purple-400 hover:bg-gray-800">
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
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-800">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="text-white font-medium">{user.name}</span>
                    <span className="text-gray-400">▼</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-800 text-white border border-gray-700">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                    <p className="text-xs text-purple-400 font-medium capitalize">{user.role}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-600" />
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
                  <DropdownMenuSeparator className="bg-gray-600" />
                  <DropdownMenuItem className="text-red-500 font-bold hover:bg-red-600/10" onClick={handleLogout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <span className="text-xl">✕</span> : <span className="text-xl">☰</span>}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700 bg-gray-900 text-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/events" className="block px-3 py-2 rounded-md hover:bg-gray-800" onClick={toggleMobileMenu}>
                Browse Events
              </Link>

              {user && (
                <>
                  <Link to="/my-bookings" className="block px-3 py-2 rounded-md hover:bg-gray-800" onClick={toggleMobileMenu}>My Bookings</Link>
                  <Link to="/create-event" className="block px-3 py-2 rounded-md hover:bg-gray-800" onClick={toggleMobileMenu}>Create Event</Link>
                  <Link to="/my-events" className="block px-3 py-2 rounded-md hover:bg-gray-800" onClick={toggleMobileMenu}>My Events</Link>

                  {(user.role === "admin" || user.role === "event_creator") && (
                    <Link to="/manage-events" className="block px-3 py-2 rounded-md hover:bg-gray-800" onClick={toggleMobileMenu}>Manage Events</Link>
                  )}

                  {user.role === "admin" && (
                    <>
                      <Link to="/admin-dashboard" className="block px-3 py-2 rounded-md hover:bg-gray-800" onClick={toggleMobileMenu}>Admin Panel</Link>
                      <Link to="/user-management" className="block px-3 py-2 rounded-md hover:bg-gray-800" onClick={toggleMobileMenu}>User Management</Link>
                    </>
                  )}

                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <Link to="/profile" className="block px-3 py-2 hover:bg-gray-800" onClick={toggleMobileMenu}>Profile Settings</Link>
                  </div>
                </>
              )}

              <div className="border-t border-gray-700 pt-4 mt-4">
                {!user ? (
                  <div className="space-y-2">
                    <Link to="/login">
                      <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-purple-400 hover:bg-gray-800">
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
                    <div className="px-3 py-2 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                      <p className="text-xs text-purple-400 font-medium capitalize">{user.role}</p>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-900/20"
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
