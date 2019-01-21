const GUEST_BOOK_PAGE = `<html>
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
        <label>Name</label>: <input type="text" name="name" id="name" required />
      </div>

      <div class="field_style">
        <label>comment</label>:
        <textarea name="comment" id="comment" cols="20" rows="5" required></textarea>
      </div>

      <button id="submit" class="submit">submit</button>
      <hr />
    </form>

      <p><h2>COMMENTS</h2><button id="refresh" class="refresh" onclick = "refresh()">&#x21bb;</button></p>
     <div id="data" class= "comments" style=" width: 1300px ; height  : 400px">`;

const GUEST_BOOK_PAGE_FOOTER = `</div>
    <script src="/script/fetchComments.js"></script>
  </body>
</html>`;

module.exports = { GUEST_BOOK_PAGE, GUEST_BOOK_PAGE_FOOTER };
