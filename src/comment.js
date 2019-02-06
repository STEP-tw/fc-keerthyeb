const fs = require("fs");
const USER_COMMENT_FILE = "./data/data.json";
const FILE_ENCODING = "utf-8";

class Comment {
  constructor(userComments) {
    initializeDataDirectory();
    this.userComments = userComments;
  }
  read() {
    return this.userComments;
  }
  add(comment) {
    this.userComments.unshift(comment);
    this.write();
  }
  write() {
    fs.writeFile(
      USER_COMMENT_FILE,
      JSON.stringify(this.userComments),
      FILE_ENCODING,
      err => {}
    );
  }
}

const initializeDataDirectory = function() {
  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
    fs.writeFileSync("./data/data.json", "{}");
  }
};

module.exports = { Comment };
