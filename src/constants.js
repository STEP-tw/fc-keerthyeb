const USER_COMMENT_FILE = "./data/data.json";
const FILE_ENCODING = "utf-8";
const GUEST_BOOK = "./src/templates/htmlTemplates.html";

const LOGIN_HTML = `<html>
  <form method="POST" action="/login">
    <label>Name:</label>
    <input id="txtName" type="text" name="name" required />
    <input type="submit" value="Login" />
  </form>
</html>
`;

const COMMENT_HTML = `<html>
  <form method="POST" action="/logout">
    <div>
      <label>Name:</label> <label id="user">####NAME####</label>
      <input type="submit" value="Logout" />
    </div>
    <div>
      <label>Comment:</label>
      <textarea id="comment" name="comment" rows="5" cols="30"></textarea>
    </div>
  </form>
  <button id="submit" class="submit" onclick="sendComment()">submit</button>
</html>`;

module.exports = {
  USER_COMMENT_FILE,
  FILE_ENCODING,
  GUEST_BOOK,
  LOGIN_HTML,
  COMMENT_HTML
};
