const express = require("express");
const db = require("./database");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 8080;

app.use(express.json());

let users = [];
// Get all Users
app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/allusers", async (req, res) => {
  const result = await db
    .promise()
    .query(`SELECT * FROM mhs_loginaccount limit 10`);
  res.status(200).send(result[0]);
});

// Create a user
app.post("/users", (req, res) => {
  const createduser = req.body;
  const userId = uuidv4();
  const userWithId = { ...createduser, id: userId };

  users.push(userWithId);
  res.send(`User with name ${createduser.firstName} added to the database`);
});

// Getting one User with id
app.get("/users/:id/", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
});
// Delete Users with data
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`The ${id} specified was successfully deleted`);
});

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  const { firstName, lastName, age } = req.body;

  if (firstName) {
    user.firstName = firstName;
  }
  if (lastName) {
    user.lastName = lastName;
  }
  if (age) {
    user.age = age;
  }

  res.send(`The user with ${id} is updated successfully`);
});
app.listen(port, () => {
  console.log(`Example app listeninccg on port ${port}`);
});
