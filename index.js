const logEvents = require("./logEvents.js");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

//initialize object
const myEmitter = new MyEmitter();

// add listener for the log event

myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  //emit Event
  myEmitter.emit("log", "log evente emitted");
}, 2000);
