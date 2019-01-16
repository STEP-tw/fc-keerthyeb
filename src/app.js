const fs = require("fs");
const app = (req, res) => {
  getURLData(req.url, res);
};

const getURLData = function(url, res) {
  let file = "." + url;
  if (url == "/") {
    file = "./src/index.html";
  }
  readFileData(file, res);
};

const sendData = function(res, data, statusCode) {
  res.statusCode = statusCode;
  res.write(data);
  res.end();
};

const readFileData = function(file, res) {
  fs.readFile(file, (err, data) => {
    if (err) {
      return sendData(res, "Request Not Found", 404);
    }
    return sendData(res, data, 200);
  });
};
module.exports = app;
