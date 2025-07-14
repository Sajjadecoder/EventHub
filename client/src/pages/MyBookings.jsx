"use client"

import LoginPrompt from "@/components/LoginPrompt"
import axios from "axios"
import { useEffect, useState } from "react"

export default function MyBookings() {
  const [currentUser, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const resp = localStorage.getItem("user")
    if (resp) {
      setUser(JSON.parse(resp))
    }
  }, [])

  useEffect(() => {
    if (!currentUser?.id) return

    const fetchBookings = async () => {
      try {
        const result = await axios.get(`${backendUrl}/api/users/get-bookings`, {
          params: { userID: currentUser.id },
        })
        setBookings(result.data.events)
      } catch (error) {
        console.error("Error fetching bookings:", error.message)
      }
    }

    fetchBookings()
  }, [currentUser])

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString)
    // If invalid, return fallback
    if (isNaN(date.getTime())) return "Unknown"

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }


  const getCategoryColor = (category) => {
    const colors = {
      Tech: "bg-blue-800 text-blue-100",
      Health: "bg-red-800 text-red-100",
      Education: "bg-indigo-800 text-indigo-100",
      Entertainment: "bg-pink-800 text-pink-100",
    }
    return colors[category] || "bg-gray-700 text-white"
  }


  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking)
    setShowCancelModal(true)
  }

  const confirmCancelBooking =async () => {
    // console.log("Cancel selected booking id: ",selectedBooking.booking_id)
    setBookings(
      bookings.filter((b) => b.booking_id !== selectedBooking.booking_id)
    )
    const result = await axios.delete(`${backendUrl}/api/users/cancel-booking`,{params: {booking_id: selectedBooking.booking_id,user_id: currentUser.id  }})
    console.log(result)
    setShowCancelModal(false)
    setSelectedBooking(null)
  }

  const closeModal = () => {
    setShowCancelModal(false)

    setSelectedBooking(null)
  }

  const bookingStats = {
    total: bookings.length,
  }

  return (
    <>
      {!currentUser ? (
        <LoginPrompt />
      ) : (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
                  <p className="text-gray-400">Manage and view all your event bookings</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{currentUser.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{currentUser.name}</h3>
                      <p className="text-sm text-gray-400">{currentUser.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-700">
                  <div className="text-2xl font-bold">{bookingStats.total}</div>
                  <div className="text-sm text-gray-400">Total Bookings</div>
                </div>
              </div>
            </div>

            {/* Bookings List */}
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
                <p className="text-gray-400 mb-6">Start exploring events and make your first booking!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.booking_id}
                    className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold">{booking.title}</h3>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                                    booking.category
                                  )}`}
                                >
                                  {booking.category}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                                {/* Booking Date */}
                                <div className="flex items-center gap-2">
                                  <span className="text-base">📅</span>
                                  <div>
                                    <div className="font-medium text-white">
                                      Booked: {formatDisplayDate(booking.bookingdate)}
                                    </div>
                                    <div className="text-xs">
                                      {new Date(booking.bookingdate).toLocaleTimeString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                      })}
                                    </div>
                                  </div>
                                </div>

                                {/* Event Date */}
                                <div className="flex items-center gap-2">
                                  <span className="text-base">🗓️</span>
                                  <div>
                                    <div className="font-medium text-white">
                                      Event: {formatDisplayDate(booking.eventdate)}
                                    </div>
                                    <div className="text-xs">
                                      {new Date(booking.eventdate).toLocaleTimeString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                      })}
                                    </div>
                                  </div>
                                </div>

                                {/* Event Location */}
                                <div className="flex items-center gap-2">
                                  <span className="text-base">📍</span>
                                  <span className="font-medium text-white">{booking.eventlocation}</span>
                                </div>
                              </div>

                              <div className="mt-2 text-sm text-gray-400">
                                <span className="text-base">👤</span>{" "}
                                <span className="font-medium text-white">Planner: {booking.eventplanner}</span>
                              </div>

                            </div>
                          </div>
                        </div>

                        {/* Booking Details */}
                        <div className="lg:text-right">
                          <div className="flex flex-col gap-2 text-sm text-gray-400">
                            <div>Booking ID: {booking.booking_id}</div>
                            <div>Booked: {formatDisplayDate(booking.bookingdate)}</div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <button
                          onClick={() => handleCancelBooking(booking)}
                          className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Cancel Modal */}
            {showCancelModal && selectedBooking && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-gray-800 text-white rounded-lg max-w-md w-full">
                  <div className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">⚠️</div>
                      <h3 className="text-lg font-semibold mb-2">Cancel Booking</h3>
                      <p className="text-gray-300 mb-4">
                        Are you sure you want to cancel your booking for{" "}
                        <strong>"{selectedBooking.title}"</strong>?
                      </p>
                      <div className="bg-yellow-800/30 border border-yellow-600 rounded-lg p-3 mb-6">
                        <p className="text-yellow-200 text-sm">
                          <strong>Note:</strong> Cancellation may be subject to terms and conditions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 p-6 border-t border-gray-700 bg-gray-900">
                    <button
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 text-white border border-gray-500 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
                    >
                      Keep Booking
                    </button>
                    <button
                      onClick={confirmCancelBooking}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
