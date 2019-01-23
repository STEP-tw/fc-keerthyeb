const fs = require("fs");
const Sheeghra = require("./sheeghra");
const { getGuestBookPage, generateTable } = require("./guestBookPage");
const { Comment } = require("./comment.js");

let comments = new Comment();
comments.load();
const ROOT_DIR = "./public";
const HOME_PAGE = "/index.html";

const readFileContent = function(req, res) {
  getGuestBookPage(req, res, comments.read());
};

const getCommentPage = function(req, res) {
  let content = decode(req.body.split("=")[1]);
  res.setHeader("Set-Cookie", "username=" + content);
  res.writeHead(302, { Location: "/guestBook.html" });
  res.end();
};

const getURLData = function(req, res) {
  let file = ROOT_DIR + req.url;
  if (req.url == "/") {
    file = ROOT_DIR + HOME_PAGE;
  }
  readFileData(file, res);
};

const decode = data => decodeURIComponent(data.replace(/\+/g, " "));

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
  let content = req.body;
  let date = new Date();
  content = JSON.parse(content);
  content["dateTime"] = date;
  comments.add(content);
  getCommentsHtml(req, res);
};

const logRequest = function(req, res, next) {
  console.log(req.method + req.url);
  next();
};

const getCommentsHtml = function(req, res) {
  sendData(res, generateTable(comments.read()), 200);
};

const loadCookies = function(request, response, next) {
  const cookie = request.headers["cookie"];
  let cookies = {};
  if (cookie) {
    cookie.split(";").forEach(element => {
      const [name, value] = element.split("=");
      cookies[name] = value;
    });
  }
  request.cookies = cookies;
  next();
};

const readData = function(request, response, next) {
  let content = "";
  request.on("data", chunk => (content += chunk));
  request.on("end", () => {
    request.body = content;
    next();
  });
};

const logoutHandler = function(req, res) {
  const expiryDate = "Thu, 01 Jan 1970 00:00:00 UTC";
  res.setHeader("Set-Cookie", `username=;expires=${expiryDate};`);
  res.writeHead(302, { Location: "/guestBook.html" });
  res.end();
};

const app = new Sheeghra();
app.use(loadCookies);
app.use(readData);
app.use(logRequest);
app.post("/login", getCommentPage);
app.post("/logout", logoutHandler);
app.get("/guestBook.html", readFileContent);
app.get("/comments", getCommentsHtml);
app.post("/comments", handlePOSTRequest);
app.use(getURLData);
const requestHandler = app.handleRequest.bind(app);

module.exports = requestHandler;
