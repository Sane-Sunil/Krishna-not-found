const maindiv = document.querySelector(".index");
maindiv.querySelector("h1").innerHTML = "JS enabled";

setTimeout(() => {
    window.location.href = "home.html"
}, 1000);