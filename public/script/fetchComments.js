const getCommentDiv = document => document.getElementById("comment_session");
const getUserName = document => document.getElementById("user").textContent;
const getCurrentComment = document => document.getElementById("comment").value;
const clearComment = document =>
  (document.getElementById("comment").value = "");

const refresh = function() {
  fetch("/comments")
    .then(res => res.text())
    .then(comment => {
      updateComment(comment);
    });
};

const sendComment = function() {
  const name = getUserName(document);
  const comment = getCurrentComment(document);
  fetch("/comments", {
    method: "POST",
    body: JSON.stringify({ name, comment }),
    headers: { "content-type": "application/json" }
  })
    .then(res => res.text())
    .then(comment => {
      updateComment(comment);
      clearComment(document);
    });
};

const updateComment = function(comment) {
  let commentsDiv = getCommentDiv(document);
  commentsDiv.innerHTML = comment;
};
