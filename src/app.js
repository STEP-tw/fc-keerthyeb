const fs = require("fs");
const Sheeghra = require("./sheeghra");
const { getGuestBookPage, generateTable } = require("./guestBookPage");
const {
  Comment,
  KEYS_SEPERATOR,
  KEY_VALUE_SEPERATOR
} = require("./comment.js");

let comments = new Comment();
comments.readCommentFromFile();
const ROOT_DIR = "./public";
const HOME_PAGE = "/index.html";

const readFileContent = function(req, res) {
  getGuestBookPage(req, res, comments.getComments());
};

const getURLData = function(req, res) {
  let file = ROOT_DIR + req.url;
  if (req.url == "/") {
    file = ROOT_DIR + HOME_PAGE;
  }
  readFileData(file, res);
};

const readArgs = function(text) {
  console.log(text);
  let args = {};
  const splitKeyValue = pair => pair.split(KEY_VALUE_SEPERATOR);
  const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
  text
    .split(KEYS_SEPERATOR)
    .map(splitKeyValue)
    .forEach(assignKeyValueToArgs);
  return args;
};

const sendData = function(res, data, statusCode) {
  res.statusCode = statusCode;
  res.write(data);
  res.end();
};

const readFileData = function(file, res) {
  let statusCode = 200;
  const PAGE_NOT_FOUND = `<html><center><img src="../images/404.jpg"></center></html>`;
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
    content += KEYS_SEPERATOR + "dateTime" + KEY_VALUE_SEPERATOR + date;
    comments.addComment(readArgs(content));
    getGuestBookPage(req, res, comments.getComments());
  });
};

const logRequest = function(req, res, next) {
  console.log(req.method + req.url);
  next();
};

const getCommentsHtml = function(req, res) {
  let data = generateTable.bind(null, comments.getComments())();
  res.write(data);
  res.end();
};

const app = new Sheeghra();
app.use(logRequest);
app.get("/guestBook.html", readFileContent);
app.get("/comments", getCommentsHtml);
app.post("/guestBook.html", handlePOSTRequest);
app.use(getURLData);
const requestHandler = app.handleRequest.bind(app);

module.exports = requestHandler;
