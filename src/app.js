const express = require("express");
const app = express();

const {
  loadCookies,
  readData,
  logRequest,
  loginHandler,
  logoutHandler,
  loadGuestBook,
  getComments,
  updateComments
} = require("./handlers");

app.use(loadCookies);
app.use(readData);
app.use(logRequest);
app.post("/login", loginHandler);
app.post("/logout", logoutHandler);
app.get("/guestBook.html", loadGuestBook);
app.get("/comments", getComments);
app.post("/comments", updateComments);
app.use(express.static("public"));

module.exports = app;
