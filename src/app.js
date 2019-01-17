const fs = require("fs");
const app = (req, res) => {
  getURLData(req.url, res);
};

const getURLData = function(url, res) {
  let file = "./public" + url;
  if (url == "/") {
    file = "./public/index.html";
  }
  readFileData(file, res);
};

const sendData = function(res, data, statusCode) {
  res.statusCode = statusCode;
  res.write(data);
  res.end();
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
module.exports = app;
