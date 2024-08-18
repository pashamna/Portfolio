function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");

  // Save the current mode in localStorage
  if (element.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// Check the user's theme preference when the page loads
window.onload = function () {
  var theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("darkModeSwitch").checked = true;
  }
};

function toggleTheme() {
  var element = document.body;
  var themeIcon = document.getElementById("theme-icon");

  element.classList.toggle("dark-mode");

  if (element.classList.contains("dark-mode")) {
    themeIcon.classList.remove("bi-sun");
    themeIcon.classList.add("bi-moon");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("bi-moon");
    themeIcon.classList.add("bi-sun");
    localStorage.setItem("theme", "light");
  }
}

// Check the user's theme preference when the page loads
window.onload = function () {
  var theme = localStorage.getItem("theme");
  var themeIcon = document.getElementById("theme-icon");

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.remove("bi-sun");
    themeIcon.classList.add("bi-moon");
    document.getElementById("darkModeSwitch").checked = true;
  } else {
    themeIcon.classList.add("bi-sun");
    themeIcon.classList.remove("bi-moon");
  }
};
