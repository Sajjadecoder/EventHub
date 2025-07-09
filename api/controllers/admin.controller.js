import { pool } from "../db/connectDB.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createEvent = asyncHandler(async (req, res) => {
  const { title, category, location, totalSeats, date, userID, img } = req.body;

  const query = `
    INSERT INTO events(title, date, location, created_by, totalSeats, seatsAvailable, img, category)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;

  const result = await pool.query(query, [
    title,
    date,
    location,
    userID,
    Number(totalSeats),
    Number(totalSeats),
    img,
    category,
  ]);
  const newEvent = result.rows[0];
  console.log("New event: ", newEvent)

  if (!result || result.rows.length === 0) {
    return res.status(500).json({ message: "Event creation failed" });
  }

  console.log("Here")
  res.status(201).json({
    message: "Event created successfully",
    event: newEvent,
  });
});
const getTechEventsCreated = asyncHandler(async (req, res) => {
  console.log("tech controller")
  const { id } = req.query
  console.log("user id: ", id)
  const query = 'SELECT * FROM events WHERE category = $1 AND created_by = $2';
  const result = await pool.query(query, ['Tech', id]);

  if (!result || result.rows.length === 0) {
    return res.status(200).json({
      message: "No tech events found",
      events: [],
    });
  }


  res.status(200).json({
    message: "Tech events retrieved successfully",
    events: result.rows,
  });
})

const getHealthEventsCreated = asyncHandler(async (req, res) => {
  console.log("health controller")
  const { id } = req.query
  const query = 'SELECT * FROM events WHERE category = $1 AND created_by = $2';
  const result = await pool.query(query, ['Health', id]);

  if (!result || result.rows.length === 0) {
    return res.status(200).json({
      message: "No tech events found",
      events: [],
    });
  }

  res.status(200).json({
    message: "health events retrieved successfully",
    events: result.rows,
  });
})

const getEntertainmentEventsCreated = asyncHandler(async (req, res) => {
  console.log("entertainment controller")
  const { id } = req.query
  const query = 'SELECT * FROM events WHERE category = $1 AND created_by = $2';
  const result = await pool.query(query, ['Entertainment', id]);

  if (!result || result.rows.length === 0) {
    return res.status(200).json({
      message: "No tech events found",
      events: [],
    });
  }


  res.status(200).json({
    message: "Entertainment events retrieved successfully",
    events: result.rows,
  });
})

const getEducationEventsCreated = asyncHandler(async (req, res) => {
  console.log("edu controller")
  const { id } = req.query
  const query = 'SELECT * FROM events WHERE category = $1 AND created_by = $2';
  const result = await pool.query(query, ['Education', id]);

  if (!result || result.rows.length === 0) {
    return res.status(200).json({
      message: "No tech events found",
      events: [],
    });
  }

  res.status(200).json({
    message: "Education events retrieved successfully",
    events: result.rows,
  });
})
const getAdminNames = asyncHandler(async (req, res) => {
  const result = await pool.query('SELECT id,name,email FROM users WHERE role = $1', ['admin'])
  res.status(200).json({
    message: "Admins details",
    admins: result.rows
  })

})
const getAllEvents = asyncHandler(async (req, res) => {
  const result = await pool.query(`SELECT 
                                    events.id, 
                                    events.title, 
                                    events.category, 
                                    events.location, 
                                    events.totalseats, 
                                    events.seatsavailable, 
                                    events.date, 
                                    users.id AS createdby_id, 
                                    users.name AS createdby_name, 
                                    users.email 
                                  FROM events 
                                  JOIN users ON events.created_by = users.id
`)
  res.status(200).json({
    message: "Admins details",
    events: result.rows
  })

})
const deleteEvent = asyncHandler(async (req, res) => {
  const { eventID } = req.body
  await pool.query('DELETE FROM bookings WHERE event_id = $1', [eventID]);
  await pool.query('DELETE FROM events WHERE id = $1', [eventID]);
  res.status(200).json({ message: "Event and associated bookings deleted successfully." });
})
export {
  createEvent,
  getTechEventsCreated,
  getHealthEventsCreated,
  getEducationEventsCreated,
  getEntertainmentEventsCreated,
  getAdminNames,
  getAllEvents,
  deleteEvent
};
