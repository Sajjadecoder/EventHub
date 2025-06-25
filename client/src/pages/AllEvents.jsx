import React from 'react'
import techEvents from '@/eventsData.js'
import EventCard from '@/components/EventCard';
function AllEvents() {

    const mappedEvents = techEvents.map((event, index) => (
    <EventCard key={index} event={event} />
  ));
    return (
       <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {mappedEvents}
    </div>
    )
}

export default AllEvents
