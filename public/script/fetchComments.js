const refresh = function() {
  fetch("/comments")
    .then(res => res.text())
    .then(data => {
      document.getElementById("data").innerHTML = data;
    });
};
