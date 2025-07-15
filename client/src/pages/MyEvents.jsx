import Navbar from "@/components/Navbar";
import UnauthorizedBox from "@/components/UnauthorizedBox";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyEvents = () => {
  const [techEvents, setTechEvents] = useState([]);
  const [healthEvents, setHealthEvents] = useState([]);
  const [entertainmentEvents, setEntertainmentEvents] = useState([]);
  const [educationEvents, setEducationEvents] = useState([]);
  const [user, setUser] = useState(null)
 useEffect(() => {
  const fetchEvents = async () => {
    try {
      const resp = localStorage.getItem("user");
      const token = localStorage.getItem("accessToken");

      if (!resp || !token) return;

      const parsedUser = JSON.parse(resp);
      setUser(parsedUser);
      console.log("User is:", parsedUser);

      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Only if your backend sets/sends cookies
        params: {
          id: parsedUser.id,
          category: 'Tech'
        },
      };
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const techRes = await axios.get(`${backendUrl}/api/admin/get-events-created`, config);
      setTechEvents(techRes.data.events);
      console.log("tech: ",techRes.data.events)
      config.params.category = 'Health'
      const healthRes = await axios.get(`${backendUrl}/api/admin/get-events-created`, config);
      setHealthEvents(healthRes.data.events);
      console.log("health: ",healthRes.data.events)
      
      config.params.category = 'Education'
      const eduRes = await axios.get(`${backendUrl}/api/admin/get-events-created`, config);
      setEducationEvents(eduRes.data.events);
      console.log("edu: ",eduRes.data.events)
      
      config.params.category = 'Entertainment'
      const entertainmentRes = await axios.get(`${backendUrl}/api/admin/get-events-created`, config);
      setEntertainmentEvents(entertainmentRes.data.events);
      console.log("Entert: ",entertainmentRes.data.events)

    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  fetchEvents();
}, []);


  const renderCard = (event, index) => (
    <div key={index} className="border border-gray-700 rounded-xl shadow-md bg-gray-800 overflow-hidden">
      <img src={event.img} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-white">{event.title}</h2>
        <p className="text-sm text-gray-400">📍 {event.location}</p>
        <p className="text-sm text-gray-400">📅 {new Date(event.date).toLocaleString()}</p>
        <p className="text-sm text-gray-400">
          🎫 {event.seatsavailable} / {event.totalseats} seats available
        </p>
        <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-purple-600 text-white">
          {event.category}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      {user?.role === "admin" ? <div className="w-full bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-6xl mx-auto p-6 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">My Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {techEvents.length > 0 && techEvents.map(renderCard)}
              {healthEvents.length > 0 && healthEvents.map(renderCard)}
              {educationEvents.length > 0 && educationEvents.map(renderCard)}
              {entertainmentEvents.length > 0 && entertainmentEvents.map(renderCard)}
            </div>
          </div>
        </div>
      </div>
        : <UnauthorizedBox />}
    </>
  );
};

export default MyEvents;
