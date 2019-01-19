const fs = require("fs");
const Sheeghra = require("./sheeghra");
const app = new Sheeghra();
const getGuestBookPage = require("./guestBookPage");
const { Comment } = require("./comment.js");
let comments = new Comment();
const requestHandler = app.handleRequest.bind(app);

const readFileContent = function(req, res) {
  getGuestBookPage(req, res, comments.getComments());
};

const getURLData = function(req, res) {
  let file = "./public" + req.url;
  if (req.url == "/") {
    file = "./public/index.html";
  }
  readFileData(file, res);
};

const sendData = function(res, data, statusCode) {
  res.statusCode = statusCode;
  res.write(data);
  res.end();
};

const readArgs = text => {
  let args = {};
  const splitKeyValue = pair => pair.split("=");
  const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
  text
    .split("&")
    .map(splitKeyValue)
    .forEach(assignKeyValueToArgs);
  return args;
};

const readFileData = function(file, res) {
  let statusCode = 200;
  const PAGE_NOT_FOUND = `<html><center><img src="/404.jpg"></center></html>`;
  fs.readFile(file, (err, data) => {
    if (err) {
      data = PAGE_NOT_FOUND;
      statusCode = 404;
    }
    sendData(res, data, statusCode);
  });
};

const handlePOSTRequest = function(req, res) {
  let content = "";
  req.on("data", chunk => {
    content += chunk;
  });
  req.on("end", () => {
    let date = new Date().toLocaleString();
    content += "&dateTime=" + date;
    comments.addComment(readArgs(content));
    getGuestBookPage(req, res, comments.getComments());
  });
};

const logRequest = function(req, res, next) {
  console.log(req.method + req.url);
  next();
};

app.use(logRequest);
app.get("/guestBook.html", readFileContent);
app.post("/guestBook.html", handlePOSTRequest);
app.use(getURLData);

module.exports = requestHandler;
