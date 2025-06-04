const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const COMMENTS_FILE = "comments.json";

function readComments() {
  try {
    const data = fs.readFileSync(COMMENTS_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

function writeComments(data) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(data, null, 2), "utf8");
}

app.get("/api/movies/:id/comments", (req, res) => {
  const movieId = req.params.id;
  const commentsData = readComments();
  const comments = commentsData[movieId] || [];

  const averageRating =
    comments.length > 0
      ? comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
      : 0;

  res.json({
    comments,
    averageRating: parseFloat(averageRating.toFixed(1))
  });
});

app.post("/api/movies/:id/comments", (req, res) => {
  const movieId = req.params.id;
  const { author, text, rating } = req.body;

  if (!author || !text || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid comment data." });
  }

  const commentsData = readComments();
  if (!commentsData[movieId]) {
    commentsData[movieId] = [];
  }

  commentsData[movieId].push({ author, text, rating: Number(rating) });
  writeComments(commentsData);

  const updated = commentsData[movieId];
  const averageRating =
    updated.reduce((sum, c) => sum + c.rating, 0) / updated.length;

  res.json({
    message: "Comment added.",
    averageRating: parseFloat(averageRating.toFixed(1))
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
