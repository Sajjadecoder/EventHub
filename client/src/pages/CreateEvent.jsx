"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import axios from "axios"
import UnauthorizedBox from "@/components/UnauthorizedBox"
import { useNavigate } from "react-router-dom"
export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    totalSeats: "",
    date: "",
    description: "",
  })
  const [errors, setErrors] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState(null)
  const categories = [
    "Tech",
    "Health",
    "Education",
    "Entertainment",
  ]
  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      console.log("No file")
    }

    setImageFile(file)


  }
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
  const navigate = useNavigate()
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
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

  }, [])
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

    if (!formData.totalSeats) {
      newErrors.totalSeats = "Number of seats is required"
    } else if (Number.parseInt(formData.totalSeats) < 1) {
      newErrors.totalSeats = "Must have at least 1 seat available"
    } else if (Number.parseInt(formData.totalSeats) > 100) {
      newErrors.totalSeats = "Maximum 100 seats allowed"
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
    const data = new FormData()
    data.append("file", imageFile)
    data.append("upload_preset", "EventHub")
    let uploadedImgUrl = 0
    // data.append("cloud_name","sajjadahmed")
    try {

      const url = `https://api.cloudinary.com/v1_1/sajjadahmed/image/upload`;
      const res = await axios.post(url, data)
      uploadedImgUrl = res.data.secure_url
      if (!uploadedImgUrl) {
        alert("Image URL is not defined")
      }
      console.log("Img url: ", uploadedImgUrl)

    } catch (error) {
      console.log("Error uploading to Cloudinary:", error);

    }
    if (validateForm()) {
      setIsSubmitting(true)
      const payload = {
        title: formData.title,
        category: formData.category,
        location: formData.location,
        totalSeats: formData.totalSeats,
        date: formData.date,
        userID: user.id,
        img: uploadedImgUrl
      }

      try {
        // Simulate API call
        const res = await axios.post(
          "http://localhost:3000/api/admin/create-event",
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true, // optional: only needed if your backend uses cookies
          }
        );
        // Handle successful submission
        console.log("Event created:", {
          ...formData,
          totalSeats: Number.parseInt(formData.totalSeats),
          createdAt: new Date().toISOString(),
        })

        // Reset form

        alert("Event created successfully!")
        navigate('/my-events')
      } catch (error) {
        console.error("Error creating event:", error)
      } finally {
        setIsSubmitting(false)
        setFormData({
          title: "",
          category: "",
          location: "",
          totalSeats: "",
          date: "",
        })

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
    <>
      {user?.role === "admin" ?

        <div className="min-h-screen bg-gray-900 py-6 px-4 text-gray-200">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border border-gray-700 bg-gray-800">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🎪</span>
                </div>
                <CardTitle className="text-3xl font-bold text-white">Create New Event</CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  Fill in the details below to create your amazing event
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold text-gray-300">Event Title *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">🎯</span>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter your event title"
                        className={`pl-12 h-12 bg-gray-700 text-white placeholder-gray-400 border-2 ${errors.title
                          ? "border-red-400 focus:ring-red-500"
                          : "border-gray-600 focus:ring-purple-500"
                          }`}
                      />
                    </div>
                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-semibold text-gray-300">Category *</Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger
                        className={`h-12 bg-gray-700 text-white border-2 ${errors.category ? "border-red-400" : "border-gray-600"
                          }`}
                      >
                        <SelectValue placeholder="Choose event category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white border-gray-600">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            <div className="flex items-center gap-2">
                              <span>{getCategoryIcon(category)}</span> {category}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-semibold text-gray-300">Location *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">📍</span>
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter event location"
                        className={`pl-12 h-12 bg-gray-700 text-white placeholder-gray-400 border-2 ${errors.location
                          ? "border-red-400 focus:ring-red-500"
                          : "border-gray-600 focus:ring-purple-500"
                          }`}
                      />
                    </div>
                    {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                  </div>

                  {/* Seats */}
                  <div className="space-y-2">
                    <Label htmlFor="totalSeats" className="text-sm font-semibold text-gray-300">Available Seats *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">🪑</span>
                      <Input
                        id="totalSeats"
                        name="totalSeats"
                        type="number"
                        min="1"
                        max="10000"
                        value={formData.totalSeats}
                        onChange={handleInputChange}
                        placeholder="Number of total available seats"
                        className={`pl-12 h-12 bg-gray-700 text-white placeholder-gray-400 border-2 ${errors.totalSeats
                          ? "border-red-400 focus:ring-red-500"
                          : "border-gray-600 focus:ring-purple-500"
                          }`}
                      />
                    </div>
                    {errors.totalSeats && <p className="text-sm text-red-500">{errors.totalSeats}</p>}
                  </div>

                  {/* Date & Time */}
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-semibold text-gray-300">Event Date & Time *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">📅</span>
                      <Input
                        id="date"
                        name="date"
                        type="datetime-local"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`pl-12 h-12 bg-gray-700 text-white placeholder-gray-400 border-2 ${errors.date
                          ? "border-red-400 focus:ring-red-500"
                          : "border-gray-600 focus:ring-purple-500"
                          }`}
                      />
                    </div>
                    {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-sm font-semibold text-gray-300">Event Image</Label>
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="image"
                        className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-600"
                      >
                        Upload Image
                      </label>
                      {imageFile && (
                        <span className="text-sm text-gray-400 truncate max-w-[200px]">{imageFile.name}</span>
                      )}
                    </div>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </CardContent>

                <CardContent className="pt-0 pb-8">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Event...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🎪</span> Create Event
                      </div>
                    )}
                  </Button>
                </CardContent>
              </form>
            </Card>
          </div>
        </div>
        : <UnauthorizedBox />}
    </>
  )
}
