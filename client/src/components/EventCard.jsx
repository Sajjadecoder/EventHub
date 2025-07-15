"use client"

import { Card, CardContent } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx"
import { useEffect, useState } from "react"
import axios from "axios"

export default function EventCard({ event }) {
  const eventData = event
  const [user, setUser] = useState(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { month: "short", day: "numeric", year: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoadingUser(false)


  }, [])
  useEffect(() => {
    if (user) {
      // console.log("Event card user:", user)
    }
  }, [user])
  const handleBooking = async (id) => {
  try {
    const payload = {
      userID: user.id,
      eventID: id
    }

   const backendUrl = import.meta.env.VITE_BACKEND_URL;

const result = await axios.post(`${backendUrl}/api/users/book-event`, payload, {

      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      withCredentials: true,
    })

    if (result.status === 200) {
      alert("🎉 Event booked successfully!")
      console.log("Booking response:", result.data)
    }
  } catch (error) {
    console.error("Booking failed:", error.response?.data || error.message)

    if (error.response?.status === 409) {
      alert("⚠️ You have already booked this event.")
    } else if (error.response?.status === 403) {
      alert("❌ No seats available.")
    } else {
      alert("Something went wrong while booking.")
    }
  }
}

  const getCategoryColor = (category) => {
    const colors = {
      Tech: "bg-blue-800 text-blue-100",
      Entertainment: "bg-orange-800 text-orange-100",
      Health: "bg-red-800 text-red-100",
      Education: "bg-indigo-800 text-indigo-100",
    }
    return colors[category] || "bg-gray-800 text-gray-100"
  }

  return (
    <Card className="w-full max-w-xs h-96 overflow-hidden hover:shadow-lg bg-gray-800 text-gray-200 transition-all duration-300 hover:scale-105 cursor-pointer group border border-gray-700">
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={eventData.img || "/placeholder.svg"}
          alt={eventData.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(eventData.category)}`}>
            {eventData.category}
          </span>
        </div>
        {/* Available Seats Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-200 border border-gray-600">
            {eventData.seatsavailable}/{eventData.totalseats} seats
          </span>
        </div>
      </div>

      <CardContent className="p-4 h-56 flex flex-col justify-between">
        {/* Event Details */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="font-bold text-lg text-white line-clamp-2 leading-tight">{eventData.title}</h3>

          {/* Date and Time */}
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span className="text-base">📅</span>
            <div>
              <div className="font-medium text-white">{formatDate(eventData.date)}</div>
              <div className="text-xs text-gray-400">{formatTime(eventData.date)}</div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span className="text-base">📍</span>
            <span className="font-medium text-white">{eventData.location}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3">
          {!isLoadingUser && user && <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-200"
            size="sm"
            onClick={() => handleBooking(eventData.id)}
          >
            Book Now
          </Button>}
        </div>
      </CardContent>
    </Card>
  )
}
