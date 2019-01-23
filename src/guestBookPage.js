const fs = require("fs");
let html = {
  loginHTML: `<html><form method="POST" action="/login">
<label >Name:</label>
<input id="txtName"  type="text" name="name" required>
<input type="submit"  value="Login">
</form></html>`,

  commentHTML: `<form method="POST" action="/logout">
<div>
  <label >Name:</label>
  <label id="user">####NAME####</label>
<input type="submit" value="Logout">

</div>
<div>
  <label >Comment:</label>
  <textarea id="comment" name="comment" rows="5" cols="30"></textarea>
</div>
</form>`
};

const getGuestBookPage = function(req, res, commentsDetails) {
  fs.readFile("./src/htmlTemplates.html", "utf-8", (err, htmlPage) => {
    let userName = req.cookies.username;
    let replacer = html.loginHTML;
    if (userName) {
      replacer = html.commentHTML;
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
