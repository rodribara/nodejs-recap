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

module.exports = corsOptions; // export the corsOptions object to be used in the server.js file
