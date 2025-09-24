import express from "express";
import tracksRouter from "./routes/tracks.js";
import playlistsRouter from "./routes/playlists.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle PostgreSQL errors
  if (err.code) {
    switch (err.code) {
      case "23503": // Foreign key violation
        return res
          .status(400)
          .json({ error: "Invalid reference to related data" });
      case "23505": // Unique constraint violation
        return res.status(400).json({ error: "Resource already exists" });
      case "23502": // Not null violation
        return res.status(400).json({ error: "Required field is missing" });
      default:
        return res.status(500).json({ error: "Database error" });
    }
  }

  res.status(500).json({ error: "Internal server error" });
});

export default app;
