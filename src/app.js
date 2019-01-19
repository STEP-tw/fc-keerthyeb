const fs = require("fs");
const Sheeghra = require("./sheeghra");
const getGuestBookPage = require("./guestBookPage");
const app = new Sheeghra();
const requestHandler = app.handleRequest.bind(app);

let commentsDetails = "";
const readFileContent = function(req, res) {
  fs.readFile("./src/data.JSON", "utf-8", (err, data) => {
    commentsDetails = data.slice(0, -1);
    commentsDetails = JSON.parse(`[${commentsDetails}]`);
    getGuestBookPage(req, res, commentsDetails);
  });
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
    content += "&datetime=" + date;
    content = readArgs(content);
    commentsDetails.push(content);
    let jsonData = JSON.stringify(commentsDetails) + ",";
    fs.writeFile("./src/data.JSON", jsonData, err => {
      if (err) {
        console.log("error");
      }
      getGuestBookPage(req, res, commentsDetails);
    });
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
