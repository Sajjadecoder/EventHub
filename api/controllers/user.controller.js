import { pool } from "../db/connectDB.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllTechEvents = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM events WHERE category = $1';
  const result = await pool.query(query, ['Tech']);

  if (!result || result.rows.length === 0) {
    return res.status(404).json({ message: "No tech events found" });
  }

  res.status(200).json({
    message: "Tech events retrieved successfully",
    events: result.rows,
  });
});
const getAllHealthEvents = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM events WHERE category = $1';
  const result = await pool.query(query, ['Health']);

  if (!result || result.rows.length === 0) {
    return res.status(404).json({ message: "No health events found" });
  }

  res.status(200).json({
    message: "Health events retrieved successfully",
    events: result.rows,
  });
});
const getAllEducationEvents = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM events WHERE category = $1';
  const result = await pool.query(query, ['Education']);

  if (!result || result.rows.length === 0) {
    return res.status(404).json({ message: "No Education events found" });
  }

  res.status(200).json({
    message: "Education events retrieved successfully",
    events: result.rows,
  });
});
const getAllEntertainmentEvents = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM events WHERE category = $1';
  const result = await pool.query(query, ['Entertainment']);

  if (!result || result.rows.length === 0) {
    return res.status(404).json({ message: "No Entertainment events found" });
  }

  res.status(200).json({
    message: "Entertainment events retrieved successfully",
    events: result.rows,
  });
});
const bookEvent = asyncHandler(async (req, res) => {
  console.log("Inside book event func")
  const { userID, eventID } = req.body
  //check for avl seats
  const res1 = await pool.query('SELECT seatsavailable from events where id = $1', [eventID])
  if (res1.rows[0].seatsavailable === 0) {
    return res.status(403).json({ message: "No seats available" });
  }

  const checkQuery = 'SELECT * from bookings WHERE user_id = $1  AND event_id = $2'
  const result = await pool.query(checkQuery, [userID, eventID])
  if (!result || result.rows.length === 0) {
    await pool.query('CALL insertnewbooking($1,$2)', [userID, eventID])

    await pool.query(
      'UPDATE events SET seatsavailable = seatsavailable - 1 WHERE id = $1 AND seatsavailable > 0',
      [eventID]
    );
    return res.status(200).json({ message: "Booking successful" });
  } else {
    return res.status(409).json({ message: "User already booked this event" });
  }
})
const getBookings = asyncHandler(async (req, res) => {
  const { userID } = req.query;

  const response = await pool.query(`
  SELECT 
  b.id AS booking_id,
  b.booked_at AS bookingDate,
  e.category,
  e.img,
  e.seatsavailable,
  e.totalseats,
  e.title,
  e.date AS eventDate,
  e.location AS eventLocation,
  (SELECT name FROM users WHERE id = e.created_by) AS eventplanner
FROM bookings b 
INNER JOIN events e ON b.event_id = e.id
INNER JOIN users u ON b.user_id = u.id
WHERE b.user_id = $1;


`, [userID]);

  if (!response || response.rows.length === 0) {
    res.status(201).json({
      message: "No events booked",
      events: [],
    });

  }
  else {
    res.status(200).json({
      message: "booked events fetched",
      events: response.rows,
    });

  }
})
const cancelBooking = asyncHandler(async (req, res) => {
  const { booking_id, user_id } = req.query;

  // 1. Check if booking exists and belongs to the user
  const result = await pool.query(
    'SELECT event_id FROM bookings WHERE id = $1 AND user_id = $2',
    [booking_id, user_id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Booking not found or unauthorized" });
  }

  const event_id = result.rows[0].event_id;

  // 2. Delete the booking
  await pool.query(
    'DELETE FROM bookings WHERE id = $1 AND user_id = $2',
    [booking_id, user_id]
  );

  // 3. Update seats available
  await pool.query(
    'UPDATE events SET seatsavailable = seatsavailable + 1 WHERE id = $1',
    [event_id]
  );

  res.status(200).json({ message: "Booking cancelled successfully" });
});

export { getAllTechEvents, getAllEntertainmentEvents, getAllHealthEvents, getAllEducationEvents, bookEvent, getBookings,cancelBooking };
