"use client"

import { useState,useEffect, useMemo } from "react"
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
  // Combine all events with their categories
  const allEvents = useMemo(() => {
    return [
      ...techEvents.map((event) => ({ ...event, category: "Tech" })),
      ...entertainmentEvents.map((event) => ({ ...event, category: "Entertainment" })),
      ...educationEvents.map((event) => ({ ...event, category: "Education" })),
      ...healthEvents.map((event) => ({ ...event, category: "Health" })),
    ]
  }, [])

  // Get unique locations from all events
  const uniqueLocations = useMemo(() => {
    const locations = allEvents.map((event) => event.location).filter(Boolean)
    return [...new Set(locations)].sort()
  }, [allEvents])

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const categoryMatch = categoryFilter === "all" || event.category === categoryFilter
      const locationMatch = locationFilter === "all" || event.location === locationFilter
      return categoryMatch && locationMatch
    })
  }, [allEvents, categoryFilter, locationFilter])

  // Group filtered events by category for display
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
        console.log(techRes)
      } catch (error) {
        console.error("Error fetching tech events:", error);
      }
      
      try {
        const healthRes = await axios.get("http://localhost:3000/api/users/get-health-events");
        setHealthEvents(healthRes.data.events);
        console.log(healthRes)
      } catch (error) {
        console.error("Error fetching health events:", error);
      }
      
      try {
        const eduRes = await axios.get("http://localhost:3000/api/users/get-education-events");
        setEducationEvents(eduRes.data.events);
        console.log(eduRes)
      } catch (error) {
        console.error("Error fetching education events:", error);
      }
      
      try {
        const entertainmentRes = await axios.get("http://localhost:3000/api/users/get-entertainment-events");
        setEntertainmentEvents(entertainmentRes.data.events);
        console.log(entertainmentRes)
      } catch (error) {
        console.error("Error fetching entertainment events:", error);
      }
    };

    fetchEvents();
  }, []);

  const hasActiveFilters = categoryFilter !== "all" || locationFilter !== "all"

  return (
    <>
      <Navbar />

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 border-b">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[120px] justify-between bg-transparent">
              {categoryFilter === "all" ? "All Categories" : categoryFilter}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
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
            <Button variant="outline" className="min-w-[120px] justify-between bg-transparent">
              {locationFilter === "all" ? "All Locations" : locationFilter}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-60 overflow-y-auto">
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
          <Button variant="ghost" onClick={resetFilters} className="text-sm">
            Clear Filters
          </Button>
        )}

        {/* Results Count */}
        <div className="ml-auto text-sm text-gray-600">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Events Display */}
      <div className="min-h-[400px]">
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-gray-400 mb-4">
              <Filter className="w-12 h-12 mx-auto mb-2" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more events.</p>
            {hasActiveFilters && (
              <Button onClick={resetFilters} variant="outline">
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Tech Events */}
            {techEvents.length > 0 && (
              <>
                <h1 className="text-2xl font-bold px-4 pt-4">Tech Events</h1>
                <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                  {techEvents.map((event, index) => (
                    <EventCard key={`tech-${index}`} event={event} />
                  ))}
                </div>
              </>
            )}

            {/* Entertainment Events */}
            {entertainmentEvents.length > 0 && (
              <>
                <h1 className="text-2xl font-bold px-4 pt-4">Entertainment Events</h1>
                <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                  {entertainmentEvents.map((event, index) => (
                    <EventCard key={`entertainment-${index}`} event={event} />
                  ))}
                </div>
              </>
            )}

            {/* Education Events */}
            {educationEvents.length > 0 && (
              <>
                <h1 className="text-2xl font-bold px-4 pt-4">Education Events</h1>
                <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                  {educationEvents.map((event, index) => (
                    <EventCard key={`education-${index}`} event={event} />
                  ))}
                </div>
              </>
            )}

            {/* Health Events */}
            {healthEvents.length > 0 && (
              <>
                <h1 className="text-2xl font-bold px-4 pt-4">Health Events</h1>
                <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                  {healthEvents.map((event, index) => (
                    <EventCard key={`health-${index}`} event={event} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default AllEvents
