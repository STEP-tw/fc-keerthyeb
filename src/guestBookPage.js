const fs = require("fs");

const getGuestBookPage = function(req, res, commentsDetails) {
  fs.readFile("./src/htmlTemplates.html", "utf-8", (err, htmlPage) => {
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
  return `<tr><td>${dateTime}</td><td>${name}</td><td>${comment}</td></tr>`;
};
module.exports = { getGuestBookPage, generateTable };
