const fs = require("fs");
const Sheeghra = require("../public/sheeghra");
const getGuestBookPage = require("../public/guestBookPage");
const app = new Sheeghra();
const requestHandler = app.handleRequest.bind(app);

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
    content += "&datetime=" + date;
    content = readArgs(content);
    let jsonData = JSON.stringify(content) + ",";
    fs.appendFile("./src/data.JSON", jsonData, err => {
      if (err) {
        console.log("error");
      }
      getGuestBookPage(req, res);
    });
  });
};

const handleGETRequest = function(req, res) {
  let data = readArgs(req.url);
  sendData(res, JSON.stringify(data));
};

app.get("/guestBook.html", getGuestBookPage);
app.post("/guestBook.html", handlePOSTRequest);
app.use(getURLData);

module.exports = requestHandler;
