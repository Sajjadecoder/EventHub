"use client"

import { Card, CardContent } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx"

import img1 from "../tech-img/img1.png"
export default function EventCard({ event }) {
  // Default event data if none provided
  const defaultEvent = {
    category: "Tech",
    location: "Karachi",
    availableSeats: 10,
    image: {img1},
    title: "Can AI replace Devs",
    date: "2025-07-15T18:00:00",
  }

  const eventData = event || defaultEvent
  console.log(eventData)
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      Tech: "bg-blue-100 text-blue-800",
      Business: "bg-green-100 text-green-800",
      Design: "bg-purple-100 text-purple-800",
      Marketing: "bg-orange-100 text-orange-800",
      Health: "bg-red-100 text-red-800",
      Education: "bg-indigo-100 text-indigo-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card className="w-full max-w-xs h-96 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={eventData.image || "/placeholder.svg"}
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
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {eventData.availableSeats} seats
          </span>
        </div>
      </div>

      <CardContent className="p-4 h-56 flex flex-col justify-between">
        {/* Event Details */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight">{eventData.title}</h3>

          {/* Date and Time */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-base">📅</span>
            <div>
              <div className="font-medium text-gray-900">{formatDate(eventData.date)}</div>
              <div className="text-xs">{formatTime(eventData.date)}</div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-base">📍</span>
            <span className="font-medium">{eventData.location}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3">
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-200"
            size="sm"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
