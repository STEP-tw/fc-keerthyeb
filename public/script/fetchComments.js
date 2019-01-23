const refresh = function() {
  fetch("/comments")
    .then(res => res.text())
    .then(data => {
      document.getElementById("data").innerHTML = data;
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
    .then(data => {
      document.getElementById("data").innerHTML = data;
      document.getElementById("comment").value = "";
    });
};
