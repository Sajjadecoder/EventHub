"use client"

import { useState, useEffect, useMemo } from "react"
import { techEvents, entertainmentEvents, educationEvents, healthEvents } from "@/eventsData.js"
import EventCard from "@/components/EventCard"
import axios from "axios"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Filter } from "lucide-react"

function AllEvents() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const [techEvents, setTechEvents] = useState([]);
  const [healthEvents, setHealthEvents] = useState([]);
  const [entertainmentEvents, setEntertainmentEvents] = useState([]);
  const [educationEvents, setEducationEvents] = useState([]);

  const allEvents = useMemo(() => {
    return [
      ...techEvents.map((event) => ({ ...event, category: "Tech" })),
      ...entertainmentEvents.map((event) => ({ ...event, category: "Entertainment" })),
      ...educationEvents.map((event) => ({ ...event, category: "Education" })),
      ...healthEvents.map((event) => ({ ...event, category: "Health" })),
    ]
  }, [techEvents, entertainmentEvents, educationEvents, healthEvents])

  const uniqueLocations = useMemo(() => {
    const locations = allEvents.map((event) => event.location).filter(Boolean)
    return [...new Set(locations)].sort()
  }, [allEvents])

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const categoryMatch = categoryFilter === "all" || event.category === categoryFilter
      const locationMatch = locationFilter === "all" || event.location === locationFilter
      return categoryMatch && locationMatch
    })
  }, [allEvents, categoryFilter, locationFilter])

  const groupedEvents = useMemo(() => {
    const groups = {
      Tech: [],
      Entertainment: [],
      Education: [],
      Health: [],
    }

    filteredEvents.forEach((event) => {
      if (groups[event.category]) {
        groups[event.category].push(event)
      }
    })

    return groups
  }, [filteredEvents])

  const resetFilters = () => {
    setCategoryFilter("all")
    setLocationFilter("all")
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const techRes = await axios.get("http://localhost:3000/api/users/get-tech-events");
        setTechEvents(techRes.data.events);
      } catch (error) {
        console.error("Error fetching tech events:", error);
      }

      try {
        const healthRes = await axios.get("http://localhost:3000/api/users/get-health-events");
        setHealthEvents(healthRes.data.events);
      } catch (error) {
        console.error("Error fetching health events:", error);
      }

      try {
        const eduRes = await axios.get("http://localhost:3000/api/users/get-education-events");
        setEducationEvents(eduRes.data.events);
      } catch (error) {
        console.error("Error fetching education events:", error);
      }

      try {
        const entertainmentRes = await axios.get("http://localhost:3000/api/users/get-entertainment-events");
        setEntertainmentEvents(entertainmentRes.data.events);
      } catch (error) {
        console.error("Error fetching entertainment events:", error);
      }
    };

    fetchEvents();
  }, []);

  const hasActiveFilters = categoryFilter !== "all" || locationFilter !== "all"

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <Navbar />

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 p-4 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Filters:</span>
        </div>

        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[120px] justify-between bg-transparent text-gray-200 border-gray-600 hover:border-purple-500">
              {categoryFilter === "all" ? "All Categories" : categoryFilter}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-gray-800 text-gray-200 border border-gray-600">
            <DropdownMenuRadioGroup value={categoryFilter} onValueChange={setCategoryFilter}>
              <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Tech">Tech</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Entertainment">Entertainment</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Education">Education</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Health">Health</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Location Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[120px] justify-between bg-transparent text-gray-200 border-gray-600 hover:border-purple-500">
              {locationFilter === "all" ? "All Locations" : locationFilter}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-60 overflow-y-auto bg-gray-800 text-gray-200 border border-gray-600">
            <DropdownMenuRadioGroup value={locationFilter} onValueChange={setLocationFilter}>
              <DropdownMenuRadioItem value="all">All Locations</DropdownMenuRadioItem>
              {uniqueLocations.map((location) => (
                <DropdownMenuRadioItem key={location} value={location}>
                  {location}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <Button variant="ghost" onClick={resetFilters} className="text-sm text-gray-400 hover:text-white">
            Clear Filters
          </Button>
        )}

        {/* Results Count */}
        <div className="ml-auto text-sm text-gray-400">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Events Display */}
      <div className="min-h-[400px]">
        {groupedEvents.Tech.length > 0 && (
          <>
            <h1 className="text-2xl font-bold px-4 pt-4 text-white">Tech Events</h1>
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {groupedEvents.Tech.map((event, index) => (
                <EventCard key={`tech-${index}`} event={event} />
              ))}
            </div>
          </>
        )}

        {groupedEvents.Entertainment.length > 0 && (
          <>
            <h1 className="text-2xl font-bold px-4 pt-4 text-white">Entertainment Events</h1>
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {groupedEvents.Entertainment.map((event, index) => (
                <EventCard key={`entertainment-${index}`} event={event} />
              ))}
            </div>
          </>
        )}

        {groupedEvents.Education.length > 0 && (
          <>
            <h1 className="text-2xl font-bold px-4 pt-4 text-white">Education Events</h1>
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {groupedEvents.Education.map((event, index) => (
                <EventCard key={`education-${index}`} event={event} />
              ))}
            </div>
          </>
        )}

        {groupedEvents.Health.length > 0 && (
          <>
            <h1 className="text-2xl font-bold px-4 pt-4 text-white">Health Events</h1>
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {groupedEvents.Health.map((event, index) => (
                <EventCard key={`health-${index}`} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AllEvents
