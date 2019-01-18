const fs = require("fs");

const getGuestBookPage = function(req, res) {
  fs.readFile("./src/data.JSON", "utf-8", (err, data) => {
    data = data.slice(0, -1);
    data = JSON.parse(`[${data}]`);

    let table =
      "<table border = 2><tr><th>DATETIME</th><th>NAME</th><th>COMMENT</th></tr>";
    data.reverse().forEach(d => {
      table += createRow(d);
    });

    table += `</table>`;
    console.log(table);
    let guestBook = `<html>
  <head>
    <title>Page Title</title>
    <link rel="stylesheet" type="text/css" href="styleSheet.css" />
  </head>

  <body>
    <form method="POST">
      <h1 style="color: orange; text-align: center">
        <a href="/index.html">&lt;&lt;</a> Guest Book
      </h1>
      <h2>Leave a comment</h2>

      <div class="field_style">
        <label>Name</label>: <input type="text" name="name" id="name" />
      </div>

      <div class="field_style">
        <label>comment</label>:
        <textarea name="comment" id="comment" cols="20" rows="5"></textarea>
      </div>

      <button id="submit" class="submit">submit</button>
      <hr />

      <div id="data" style=" width: 1300px ; height  : 400px">
        ${table}
      </div>
    </form>
  </body>
</html>
`;
    res.write(guestBook);
    res.end();
  });
};

const createRow = function({ datetime, name, comment }) {
  return `<tr><td>${datetime}</td><td>${name}</td><td>${comment}`;
};
module.exports = getGuestBookPage;
