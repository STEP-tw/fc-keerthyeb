const fs = require("fs");
const USER_COMMENT_FILE = "./src/data.json";
const FILE_ENCODING = "utf-8";

class Comment {
  constructor() {
    this.userComments = "";
  }

  readCommentFromFile() {
    fs.readFile(USER_COMMENT_FILE, FILE_ENCODING, (error, content) => {
      this.userComments = JSON.parse(content);
    });
  }

  getComments() {
    return this.userComments;
  }

  addComment(comment) {
    this.userComments.unshift(comment);
    this.writeCommentToFile();
  }

  writeCommentToFile() {
    fs.writeFile(
      USER_COMMENT_FILE,
      JSON.stringify(this.userComments),
      FILE_ENCODING,
      err => {}
    );
  }
}

module.exports = { Comment };
