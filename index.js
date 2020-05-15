const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

let id = 1;
const seed = {
  id,
  name: "山田太郎",
  content: "こんにちは！",
  created_at: new Date().toISOString(),
};
const comments = [seed];
id++;

app.get("/comments", async (req, res) => {
  res.json(comments);
});

app.options("/comments");
app.post("/comments", async (req, res) => {
  const { name, content } = req.body.comment;
  const comment = {
    id,
    name,
    content,
    created_at: new Date().toISOString(),
  };
  comments.unshift(comment);
  id++;

  res.json(comment);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(4000);
