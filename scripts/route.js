const contentDiv = document.getElementById("content");

const pages = {
  home: "home.js",
  _200: "_200.js",
  _404: "_404.js",
  _408: "_408.js",
  _421: "_421.js",
  _425: "_425.js",
  _426: "_426.js",
  _429: "_429.js",
  _500: "_500.js",
  _503: "_503.js",
  _504: "_504.js",
  www_error: "www_error.js",
  original_not_found: "original_not_found.js"
};

function loadScript(file, callback, errorCallback) {
  const script = document.createElement("script");
  script.src = `scripts/${file}?t=${Date.now()}`; // prevent caching
  script.onload = callback;
  script.onerror = errorCallback;
  document.body.appendChild(script);
}

function loadPage(page) {
  const file = pages[page] || pages.original_not_found;

  loadScript(
    file,
    () => {
      if (typeof window.load === "function") {
        contentDiv.innerHTML = window.load();
        if (window.init) window.init();
        if (window.attachDisintegration) window.attachDisintegration(400);
      } else {
        loadPage("original_not_found");
      }
    },
    () => {
      loadPage("original_not_found");
    }
  );
}

// Listen to hash changes
window.addEventListener("hashchange", () => {
  const page = location.hash.replace("#", "") || "home"; // default to home
  loadPage(page);
});

// Initial load
const initialPage = location.hash.replace("#", "") || "home"; // default to home
loadPage(initialPage);