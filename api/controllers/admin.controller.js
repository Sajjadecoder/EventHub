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
  console.log("New event: ",newEvent)

  if (!result || result.rows.length === 0) {
    // ✅ This ends execution
    return res.status(500).json({ message: "Event creation failed" });
  }

  console.log("Here")
  // ✅ This also ends execution
  res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
});

export { createEvent };
