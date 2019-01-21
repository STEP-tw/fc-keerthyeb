const refresh = function() {
  fetch("/guestBook.html")
    .then(res => {
      let htmlPage = res.text();
      return htmlPage;
    })
    .then(data => {
      let newHTML = document.createElement("html");
      newHTML.innerHTML = data;
      document.getElementById("data").innerHTML = newHTML.querySelector(
        "div.comments"
      ).innerHTML;
    });
};
