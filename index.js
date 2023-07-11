const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db");
const app = express();
const dotenv = require("dotenv");

// config
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
// create a todo
app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO tb1 (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM tb1");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query(`SELECT * FROM tb1 WHERE tb1_id=$1`, [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/todo/:id", async (req, res) => {
  try {
    const { description } = req.body;
    const id = req.params.id;
    const updatedtodo = await pool.query(
      "UPDATE tb1 SET DESCRIPTION=$1 WHERE tb1_id=$2 RETURNING *",
      [description, id]
    );
    res.json(updatedtodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM tb1 WHERE tb1_id=$1 RETURNING *", [id]);
    res.json("todo is deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server has started on port:${process.env.SERVER_PORT}`);
});
