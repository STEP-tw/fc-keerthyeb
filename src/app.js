const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

const {
  logRequest,
  loginHandler,
  logoutHandler,
  loadGuestBook,
  getComments,
  updateComments
} = require("./handlers");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logRequest);
app.post("/login", loginHandler);
app.post("/logout", logoutHandler);
app.get("/guestBook.html", loadGuestBook);
app.get("/comments", getComments);
app.post("/comments", updateComments);
app.use(express.static("public"));

module.exports = app;
