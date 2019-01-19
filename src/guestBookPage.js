const fs = require("fs");
const {
  GUEST_BOOK_PAGE,
  GUEST_BOOK_PAGE_FOOTER
} = require("./htmlTemplates.js");

const getGuestBookPage = function(req, res, commentsDetails) {
  let table = generateTable(commentsDetails);
  res.write(GUEST_BOOK_PAGE + table + GUEST_BOOK_PAGE_FOOTER);
  res.end();
};

const generateTable = function(data) {
  let table =
    "<table border = 2><tr><th>DATETIME</th><th>NAME</th><th>COMMENT</th></tr>";
  table += data.map(createRow).join("");
  table += `</table>`;
  return table;
};

const createRow = function({ dateTime, name, comment }) {
  return `<tr><td>${dateTime}</td><td>${name}</td><td>${comment}`;
};
module.exports = getGuestBookPage;
