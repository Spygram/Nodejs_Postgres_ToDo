//require("dotenv").config();

/*console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);*/

const express = require("express");
const { Pool } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Serve public folder outside backend
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

/* Get all todos */
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/* Add todo */
app.post("/todos", async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/* Toggle todo */
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE todos SET completed = NOT completed WHERE id=$1 RETURNING *",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/* Delete todo */
app.delete("/todos/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM todos WHERE id=$1", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Todo app running on http://localhost:${PORT}`);
});
