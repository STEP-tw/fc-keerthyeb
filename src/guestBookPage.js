const fs = require("fs");
const {
  GUEST_BOOK,
  FILE_ENCODING,
  LOGIN_HTML,
  COMMENT_HTML
} = require("./constants");

const getGuestBookPage = function(req, res, commentsDetails) {
  fs.readFile(GUEST_BOOK, FILE_ENCODING, (err, htmlPage) => {
    const userName = req.cookies.username;
    let replacer = LOGIN_HTML;
    if (userName) {
      replacer = COMMENT_HTML;
      replacer = replacer.replace("####NAME####", userName);
    }
    htmlPage = htmlPage.replace("_loginSection_", replacer);

    let table = generateTable(commentsDetails);
    res.write(htmlPage.replace("_table_", table));
    res.end();
  });
};

const generateTable = function(data) {
  let table =
    "<table border = 2><tr><th>DATETIME</th><th>NAME</th><th>COMMENT</th></tr>";
  table += data.map(createRow).join("");
  table += `</table>`;
  return table;
};

const createRow = function({ dateTime, name, comment }) {
  const commentTime = new Date(dateTime).toLocaleString();
  return `<tr><td>${commentTime}</td><td>${name}</td><td>${comment}</td></tr>`;
};

module.exports = {
  getGuestBookPage,
  generateTable
};
