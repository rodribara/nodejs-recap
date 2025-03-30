const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      // check if logs directory exists
      await fsPromises.mkdir(path.join(__dirname, "logs")); // create logs directory if it doesn't exist
    }
    await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

console.log(format(new Date(), "yyyy-MM-dd\tHH:mm:ss"));

console.log("Hello Worldx!");

console.log(uuid());

module.exports = logEvents;
