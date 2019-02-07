const fs = require("fs");
const { getGuestBookPage, generateTable } = require("./guestBookPage");
const { USER_COMMENT_FILE, FILE_ENCODING } = require("./constants");
const { decode } = require("./utils");
const { Comment, initializeDataDirectory } = require("./comment.js");
initializeDataDirectory();

const userComments = JSON.parse(
  fs.readFileSync(USER_COMMENT_FILE, FILE_ENCODING)
);

let comments = new Comment(userComments);

const loadCookies = function(req, res, next) {
  const cookie = req.headers["cookie"];
  let cookies = {};
  if (cookie) {
    cookie.split(";").forEach(element => {
      const [name, value] = element.split("=");
      cookies[name] = value;
    });
  }
  req.cookies = cookies;
  next();
};

const logRequest = function(req, res, next) {
  console.log(req.method + req.url);
  next();
};

const loginHandler = function(req, res) {
  let cookie = "username=" + decode(req.body.name);
  setCookie(res, cookie);
  res.writeHead(302, { Location: "/guestBook.html" });
  res.end();
};

const logoutHandler = function(req, res) {
  const expiryDate = "Thu, 01 Jan 1970 00:00:00 UTC";
  const cookie = `username =; expires = ${expiryDate}`;
  setCookie(res, cookie);
  res.writeHead(302, { Location: "/guestBook.html" });
  res.end();
};

const loadGuestBook = function(req, res) {
  getGuestBookPage(req, res, comments.read());
};

const getComments = function(req, res) {
  sendData(res, generateTable(comments.read()), 200);
};

const updateComments = function(req, res) {
  let content = req.body;
  let date = new Date();
  content["dateTime"] = date;
  comments.add(content);
  getComments(req, res);
};

const sendData = function(res, data, statusCode) {
  res.statusCode = statusCode;
  res.write(data);
  res.end();
};
const setCookie = (res, cookie) => res.setHeader("Set-Cookie", cookie);

module.exports = {
  updateComments,
  getComments,
  loadGuestBook,
  logoutHandler,
  loginHandler,
  loadCookies,
  logRequest
};
