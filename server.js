const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger

app.use(logger);

app.use(cors(corsOptions)); // Cross-Origin Resource Sharing (CORS) middleware
//built-in middleware to handle urlencoded form data
//'content-type': 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

app.use(express.json()); // built-in middleware for json data

app.use("/", express.static(path.join(__dirname, "public"))); // built-in middleware for static files

//routes
app.use("/", require("./routes/root")); // mount subdir router
app.use("/register", require("./routes/register")); // mount subdir router
app.use("/auth", require("./routes/auth")); // mount subdir router
app.use("/employees", require("./routes/api/employees")); // mount subdir router

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
