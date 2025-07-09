"use client"

import Navbar from "@/components/Navbar"
import UnauthorizedBox from "@/components/UnauthorizedBox";
import axios from "axios";
import { useEffect, useState } from "react"

export default function ManageEvents() {
  const [currentAdmin, setAdmin] = useState(null)
  const [users, setUser] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const resp = localStorage.getItem("user");
        setAdmin(JSON.parse(resp));
        // console.log("Admin is:", currentAdmin);
      } catch (error) {
        console.error("Error fetching Current Admin:", error.message);
      }
      try {
        const resp = await axios.get("http://localhost:3000/api/admin/admin-names")
        setUser(resp.data.admins)
      } catch (error) {
        console.error("Error fetching admins:", error.message);
      }
    };

    fetchAdmins();
  }, []);
  useEffect(() => {
    if (currentAdmin) {
      // console.log("Admin is:", currentAdmin);
    }
  }, [currentAdmin]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/get-all-events')
        // console.log("All Events: ", response.data.events)
        const formattedEvents = response.data.events.map(event => ({
          id: event.id,
          title: event.title,
          category: event.category,
          location: event.location,
          availableSeats: event.seatsavailable,
          totalSeats: event.totalseats,
          date: event.date,
          createdBy: event.createdby_name,
          createdById: event.createdby_id,  // new!
          email: event.email
        }))


        setEvents(formattedEvents)
      } catch (err) {
        console.error("Error fetching events:", err)
      }
    }

    fetchEvents()
  }, [])


  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("") //  'delete', 'view'
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterUser, setFilterUser] = useState("")
  const [selectedEvents, setSelectedEvents] = useState([])
  const [showBulkActions, setShowBulkActions] = useState(false)

  // Updated categories - only 4 categories as requested
  const categories = ["Tech", "Health", "Education", "Entertainment"]

  // Get user name by ID
  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId)
    return user ? user.name : "Unknown User"
  }

  // Get user email by ID
  const getUserEmail = (userId) => {
    const user = users.find((u) => u.id === userId)
    return user ? user.email : "unknown@email.com"
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Get category color - updated for only 4 categories
  const getCategoryColor = (category) => {
    const colors = {
      Tech: "bg-blue-100 text-blue-800",
      Health: "bg-red-100 text-red-800",
      Education: "bg-indigo-100 text-indigo-800",
      Entertainment: "bg-pink-100 text-pink-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  // Filter events (removed status filter)
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getUserName(event.createdBy).toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "" || event.category === filterCategory
    const matchesUser = filterUser === "" || event.createdById?.toString() === filterUser


    return matchesSearch && matchesCategory && matchesUser
  })

  // Handle checkbox selection
  const handleEventSelect = (eventId) => {
    setSelectedEvents((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]))
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedEvents.length === filteredEvents.length) {
      setSelectedEvents([])
    } else {
      setSelectedEvents(filteredEvents.map((event) => event.id))
    }
  }

  // Handle view event
  const handleViewEvent = (event) => {
    setSelectedEvent(event)
    setModalType("view")
    setShowModal(true)
  }


  // Handle delete event
  const handleDeleteEvent = (event) => {
    setSelectedEvent(event)
    setModalType("delete")
    setShowModal(true)
  }

  // Confirm delete
  const confirmDelete = async () => {
    console.log("Selected event: ", selectedEvent.id)
    const payload = {
      eventID: selectedEvent.id
    }
    const res = await axios.post('http://localhost:3000/api/admin/delete-event', payload)
    setEvents(events.filter((event) => event.id !== selectedEvent.id))
    setShowModal(false)
    setSelectedEvent(null)
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedEvents.length > 0) {
      const confirmed = window.confirm(
        `Are you sure you want to delete ${selectedEvents.length} selected events? This action cannot be undone.`,
      )
      if (confirmed) {
        setEvents(events.filter((event) => !selectedEvents.includes(event.id)))
        setSelectedEvents([])
        setShowBulkActions(false)
      }
    }
  }

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setModalType("");
  };

  return (
    <>
      <Navbar />
      {currentAdmin?.id === 6 ?
        <div className="min-h-screen bg-gray-900 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Admin - Manage All Events</h1>
                  <p className="text-gray-400">Manage events from all users</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{currentAdmin?.name || "Loading..."}</h3>
                      <p className="text-sm text-red-400 font-medium uppercase">{currentAdmin?.role || "Loading..."}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-700">
                  <div className="text-2xl text-white font-bold" >{events.length}</div>
                  <div className="text-sm text-gray-400">Total Events</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-700">
                  <div className="text-2xl font-bold text-green-400">
                    {events.filter(e => e.availableSeats > 0).length}
                  </div>
                  <div className="text-sm text-gray-400">Available Events</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-700">
                  <div className="text-2xl font-bold text-gray-400">
                    {events.filter(e => e.availableSeats === 0).length}
                  </div>
                  <div className="text-sm text-gray-400">Fully Booked</div>
                </div>
              </div>

              {/* Filters and Search */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Search</label>
                    <input
                      type="text"
                      placeholder="Search events, location, or creator..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* User Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Creator</label>
                    <select
                      value={filterUser}
                      onChange={(e) => setFilterUser(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Users</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchTerm("")
                        setFilterCategory("")
                        setFilterUser("")
                      }}
                      className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg font-medium transition-colors duration-200"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedEvents.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-800 font-medium">{selectedEvents.length} events selected</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedEvents([])}
                        className="px-3 py-1 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Clear Selection
                      </button>
                      <button
                        onClick={handleBulkDelete}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Delete Selected
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Events Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedEvents.length === filteredEvents.length && filteredEvents.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Event</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Creator</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Seats Available</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedEvents.includes(event.id)}
                            onChange={() => handleEventSelect(event.id)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">{event.title}</div>
                            <div className="flex gap-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}
                              >
                                {event.category}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{event.createdBy || "f"}</div>
                            <div className="text-sm text-gray-600">{event.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">{formatDate(event.date)}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">{event.location}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {event.availableSeats}/{event.totalSeats}
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full"
                              style={{
                                width: `${((event.totalSeats - event.availableSeats) / event.totalSeats) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewEvent(event)}
                              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors duration-200"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event)}
                              className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-md font-medium transition-colors duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600 text-center">
              Showing {filteredEvents.length} of {events.length} events
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">
                      {modalType === "view" && "Event Details"}
                      {modalType === "delete" && "Delete Event"}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6">
                    {modalType === "view" && selectedEvent && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{selectedEvent.title}</h3>
                          <div className="flex gap-2 mb-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(selectedEvent.category)}`}
                            >
                              {selectedEvent.category}
                            </span>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">Event Creator</h4>
                          <p className="text-blue-800">
                            <strong>{selectedEvent.createdBy}</strong>
                          </p>
                          <p className="text-blue-700 text-sm">{selectedEvent.email}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                            <p className="text-gray-900">{formatDate(selectedEvent.date)}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <p className="text-gray-900">{selectedEvent.location}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Available Seats</label>
                            <p className="text-gray-900">
                              {selectedEvent.availableSeats} / {selectedEvent.totalSeats}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bookings</label>
                            <p className="text-gray-900">
                              {selectedEvent.totalSeats - selectedEvent.availableSeats} people registered
                            </p>
                          </div>
                        </div>


                      </div>
                    )}



                    {modalType === "delete" && selectedEvent && (
                      <div className="text-center">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Are you sure you want to delete this event?
                        </h3>
                        <p className="text-gray-600 mb-4">
                          <strong>"{selectedEvent.title}"</strong> created by{" "}
                          <strong>{selectedEvent.createdBy}</strong> will be permanently deleted.
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                          <p className="text-red-800 text-sm">
                            <strong>Warning:</strong> {selectedEvent.totalSeats - selectedEvent.availableSeats} people have
                            already registered for this event. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div className="flex gap-3 p-6 border-t bg-gray-50">
                    <button
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>

                    {modalType === "delete" && (
                      <button
                        onClick={confirmDelete}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                      >
                        Delete Event
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        : <UnauthorizedBox />}
    </>
  )
}