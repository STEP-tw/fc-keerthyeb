const fs = require("fs");
const USER_COMMENT_FILE = "./src/data.json";
const FILE_ENCODING = "utf-8";
const KEYS_SEPERATOR = "&";
const KEY_VALUE_SEPERATOR = "=";

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
    let date = new Date().toLocaleString();
    comment += KEYS_SEPERATOR + "dateTime" + KEY_VALUE_SEPERATOR + date;
    this.userComments.unshift(this.readArgs(comment));
    this.writeCommentToFile();
  }

  readArgs(text) {
    let args = {};
    const splitKeyValue = pair => pair.split(KEY_VALUE_SEPERATOR);
    const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
    text
      .split(KEYS_SEPERATOR)
      .map(splitKeyValue)
      .forEach(assignKeyValueToArgs);
    return args;
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
