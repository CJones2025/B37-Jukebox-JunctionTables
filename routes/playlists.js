import express from "express";
import db from "#db/client";

const router = express.Router();

// GET /playlists - sends array of all playlists
router.get("/", async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM playlists ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// POST /playlists - creates a new empty playlist
router.post("/", async (req, res, next) => {
  try {
    // Check if request body exists
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }

    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }

    const result = await db.query(
      "INSERT INTO playlists (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// GET /playlists/:id - sends playlist specified by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate that id is a number
    if (isNaN(id) || !Number.isInteger(Number(id))) {
      return res.status(400).json({ error: "Invalid playlist ID" });
    }

    const result = await db.query("SELECT * FROM playlists WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// GET /playlists/:id/tracks - sends all tracks in the playlist
router.get("/:id/tracks", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate that id is a number
    if (isNaN(id) || !Number.isInteger(Number(id))) {
      return res.status(400).json({ error: "Invalid playlist ID" });
    }

    // First check if playlist exists
    const playlistCheck = await db.query(
      "SELECT id FROM playlists WHERE id = $1",
      [id]
    );
    if (playlistCheck.rows.length === 0) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const result = await db.query(
      `
      SELECT t.* 
      FROM tracks t
      JOIN playlists_tracks pt ON t.id = pt.track_id
      WHERE pt.playlist_id = $1
      ORDER BY t.id
    `,
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// POST /playlists/:id/tracks - adds a new track to the playlist
router.post("/:id/tracks", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate that id is a number
    if (isNaN(id) || !Number.isInteger(Number(id))) {
      return res.status(400).json({ error: "Invalid playlist ID" });
    }

    // Check if request body exists
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }

    const { trackId } = req.body;

    if (!trackId) {
      return res.status(400).json({ error: "trackId is required" });
    }

    // Validate that trackId is a number
    if (isNaN(trackId) || !Number.isInteger(Number(trackId))) {
      return res.status(400).json({ error: "Invalid track ID" });
    }

    // Check if playlist exists
    const playlistCheck = await db.query(
      "SELECT id FROM playlists WHERE id = $1",
      [id]
    );
    if (playlistCheck.rows.length === 0) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // Check if track exists
    const trackCheck = await db.query("SELECT id FROM tracks WHERE id = $1", [
      trackId,
    ]);
    if (trackCheck.rows.length === 0) {
      return res.status(400).json({ error: "Track not found" });
    }

    // Add track to playlist
    const result = await db.query(
      "INSERT INTO playlists_tracks (playlist_id, track_id) VALUES ($1, $2) RETURNING *",
      [id, trackId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
