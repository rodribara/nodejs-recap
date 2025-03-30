const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger

app.use(logger);
const whitelist = [
  "https://www.example1.com",
  "https://example1.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // allow requests from the whitelist or no origin (like mobile apps or curl requests)
      callback(null, true); // null means no error, true means allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // error if origin is not in the whitelist
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions)); // Cross-Origin Resource Sharing (CORS) middleware
//built-in middleware to handle urlencoded form data
//'content-type': 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

app.use(express.json()); // built-in middleware for json data

app.use(express.static(path.join(__dirname, "public"))); // built-in middleware for static files

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
app.all("*", (req, res) => {
  // catch all route handler
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
