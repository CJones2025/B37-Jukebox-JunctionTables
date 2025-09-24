import express from "express";
import db from "#db/client";

const router = express.Router();

// GET /tracks - sends array of all tracks
router.get("/", async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM tracks ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET /tracks/:id - sends track specified by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate that id is a number
    if (isNaN(id) || !Number.isInteger(Number(id))) {
      return res.status(400).json({ error: "Invalid track ID" });
    }

    const result = await db.query("SELECT * FROM tracks WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Track not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
