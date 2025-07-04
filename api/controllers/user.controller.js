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

export { getAllTechEvents,getAllEntertainmentEvents,getAllHealthEvents,getAllEducationEvents };
