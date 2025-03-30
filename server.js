const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

app.get("^/$|/index(.html)?", (req, res) => {
  // ()? means optional // ^/$ means the root path or /index.html
  res.sendFile(path.join(__dirname, "views", "index.html"));
  // res.sendFile("./views/index.html", { root: __dirname });
});
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "new-page.html"); // 302 by default
});

//Route handlres
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("hello html load attempt");
    next(); // go to the next middleware function
  },
  (req, res) => {
    res.send("hello html");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res, next) => {
  console.log("three");
  res.send("Finished middleware chain"); // send response to the client
};
app.get(
  "/chain(.html)?",
  [one, two, three], // array of middleware functions
  (req, res) => {
    res.send("Chain middleware");
  }
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
