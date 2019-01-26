const Sheeghra = require("./sheeghra");
const {
  loadCookies,
  readData,
  logRequest,
  loginHandler,
  logoutHandler,
  loadGuestBook,
  getComments,
  updateComments,
  serveFile
} = require("./handlers");

const app = new Sheeghra();
app.use(loadCookies);
app.use(readData);
app.use(logRequest);
app.post("/login", loginHandler);
app.post("/logout", logoutHandler);
app.get("/guestBook.html", loadGuestBook);
app.get("/comments", getComments);
app.post("/comments", updateComments);
app.use(serveFile);
const requestHandler = app.handleRequest.bind(app);

module.exports = requestHandler;
