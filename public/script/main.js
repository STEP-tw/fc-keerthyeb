const callInterval = function() {
  let waterJar = document.getElementById("waterJar");
  waterJar.style.visibility = "hidden";
  setTimeout(() => {
    waterJar.style.visibility = "visible";
  }, 1000);
};
