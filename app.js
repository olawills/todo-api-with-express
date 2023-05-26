//  Require the dependencies we installed

const express = require("express");
const bodyParser = require("body-parser");

// initialie express
const app = express();

// created the port
const port = 5000;

app.use(bodyParser.json());

let todos = [];

// this are the middleware for our express todo application

// Get endpoints for all existing todos that have been created
app.get("/todos/tasks", (req, res) => {
  const todo = {
    id: todos.length,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  res.json(todo);
});

// Post endpoint for creating a new todo
// in the body of our request we will provide title and completed
app.post("/todos/tasks", (req, res) => {
  const todo = {
    id: todos.length,
    title: req.body.title,
    completed: req.body.completed,
  };
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todos.push(todo);
  res.status(201).json(todo);
});

// Put endpoint to update users existing todos
app.put("/todos/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((index) => index.id === id);

  if (!todo) {
    return res
      .status(404)
      .json({ message: "Todo not found", error: "Invalid index" });
  }
  todo.title = req.body.title || req.title;
  todo.completed = req.body.completed || req.completed;
  res.json(todo);
});

//  DELETE endpoint
app.delete("/todos/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => console.log(`Listening to port ${port}`));
