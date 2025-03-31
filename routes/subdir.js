const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  // ()? means optional // ^/$ means the root path or /index.html
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});
router.get("/test(.html)?", (req, res) => {
  // ()? means optional // ^/$ means the root path or /index.html
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

module.exports = router;
