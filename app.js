const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const id = uuidv4();
app.use(express.json());

//Middlewares
function customMiddleware(req, res, next) {
  console.log("from middleware");
  next();
}

app.use(customMiddleware);
app.use(cors());

const todos = [
  {
    id: 1,
    desc: "Write python code",
    completed: false,
  },
  {
    id: 2,
    desc: "Write nodejs code",
    completed: true,
  },
  {
    id: 3,
    desc: "Write react code",
    completed: true,
  },
];

//GET POST PUT DELETE PATCH
app.get("/", (req, res, next) => {
  res.send("<h1>Todo List Home page</h1>");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  console.log(req.params);
  let todo = todos.filter((todo) => todo.id == req.params.id);
  res.json(todo);
});

app.post("/todos", (req, res) => {
  const id = uuidv4();
  let body = req.body;
  console.log(body);
  todos.push({ id: uuidv4(), ...body });
  res.json(todos);
});

app.put("/todos/:id", (req, res) => {
  let todo = todos.find((todo) => todo.id === Number(req.params.id));
  if (todo) {
    todo.desc = req.body.desc;
    todo.completed = req.body.completed;
    res.json(todos);
  } else {
    res.send("Todo with given id does not exist");
  }
});

app.delete("/todos/:id", (req, res) => {
  let index = todos.findIndex((todo) => todo.id == req.params.id);
  todos.splice(index, 1);
  res.json(todos);
});

app.listen(port, () => {
  console.log("app is listening in port", port);
});
