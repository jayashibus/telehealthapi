const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello Request , Thanks you !");
});

app.listen(port, () => {
  console.log(`Example app listeninccg on port ${port}`);
});
