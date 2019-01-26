const getCommentDiv = () => document.getElementById("comment_session");

const refresh = function() {
  fetch("/comments")
    .then(res => res.text())
    .then(comment => {
      updateComment(comment);
    });
};

const sendComment = function() {
  let name = document.getElementById("user").textContent;
  let comment = document.getElementById("comment").value;
  fetch("/comments", {
    method: "POST",
    body: JSON.stringify({ name, comment })
  })
    .then(res => res.text())
    .then(comment => {
      updateComment(comment);
      document.getElementById("comment").value = "";
    });
};

const updateComment = function(comment) {
  let commentsDiv = getCommentDiv();
  commentsDiv.innerHTML = comment;
};
