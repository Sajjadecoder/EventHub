"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    availableSeats: "",
    date: "",
    description: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    "Tech",
    "Health",
    "Education",
    "Entertainment",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))

    if (errors.category) {
      setErrors((prev) => ({
        ...prev,
        category: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required"
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters long"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.availableSeats) {
      newErrors.availableSeats = "Number of seats is required"
    } else if (Number.parseInt(formData.availableSeats) < 1) {
      newErrors.availableSeats = "Must have at least 1 seat available"
    } else if (Number.parseInt(formData.availableSeats) > 100) {
      newErrors.availableSeats = "Maximum 100 seats allowed"
    }

    if (!formData.date) {
      newErrors.date = "Event date and time is required"
    } else {
      const selectedDate = new Date(formData.date)
      const now = new Date()
      if (selectedDate <= now) {
        newErrors.date = "Event date must be in the future"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Handle successful submission
        console.log("Event created:", {
          ...formData,
          availableSeats: Number.parseInt(formData.availableSeats),
          createdAt: new Date().toISOString(),
        })

        // Reset form
        setFormData({
          title: "",
          category: "",
          location: "",
          availableSeats: "",
          date: "",
          description: "",
        })

        alert("Event created successfully!")
      } catch (error) {
        console.error("Error creating event:", error)
        alert("Failed to create event. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const getCategoryIcon = (category) => {
    const icons = {
      Tech: "💻",
      Health: "🏥",
      Education: "📚",
      Entertainment: "🎭",
    }
    return icons[category] || "📅"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-0 ring-1 ring-gray-200/50 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-0 gap-0 shadow-lg">
              <span className="text-3xl">🎪</span>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Create New Event
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Fill in the details below to create your amazing event
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Event Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                  Event Title *
                </Label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">🎯</span>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter your event title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`pl-12 h-12 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 ${
                      errors.title
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                </div>
                {errors.title && (
                  <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                  Category *
                </Label>
                <Select onValueChange={handleCategoryChange} value={formData.category}>
                  <SelectTrigger
                    className={`h-12 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 ${
                      errors.category ? "border-red-400" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <SelectValue placeholder="Choose event category" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-gray-100 shadow-xl max-h-60">
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="cursor-pointer hover:bg-purple-50 focus:bg-purple-50"
                      >
                        <div className="flex items-center gap-3 py-1">
                          <span className="text-lg">{getCategoryIcon(category)}</span>
                          <span className="font-medium">{category}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                  Location *
                </Label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">📍</span>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Enter event location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`pl-12 h-12 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 ${
                      errors.location
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                </div>
                {errors.location && (
                  <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Available Seats */}
              <div className="space-y-2">
                <Label htmlFor="availableSeats" className="text-sm font-semibold text-gray-700">
                  Available Seats *
                </Label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">🪑</span>
                  <Input
                    id="availableSeats"
                    name="availableSeats"
                    type="number"
                    min="1"
                    max="10000"
                    placeholder="Number of available seats"
                    value={formData.availableSeats}
                    onChange={handleInputChange}
                    className={`pl-12 h-12 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 ${
                      errors.availableSeats
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                </div>
                {errors.availableSeats && (
                  <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.availableSeats}
                  </p>
                )}
              </div>

              {/* Date and Time */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
                  Event Date & Time *
                </Label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">📅</span>
                  <Input
                    id="date"
                    name="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`pl-12 h-12 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 ${
                      errors.date
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.date}
                  </p>
                )}
              </div>
            </CardContent>

            <CardContent className="pt-0 pb-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r mt-5 from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Event...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎪</span>
                    Create Event
                  </div>
                )}
              </Button>

              
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  )
}
