// Tabs Functionality
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// Side Menu Functionality
var sideMenu = document.getElementById("sideMenu");
function openMenu() {
  sideMenu.style.left = "0";
}

function closeMenu() {
  sideMenu.style.left = "-200px";
}

// Google Sheets Form Submission
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxLpiD19BQH7ik_2IvTcV0ED9G-oq2iHGe2iBi9yHdVdl9FKvR3xKjlPrcyG-sc3em0/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Submit Successfully";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 1000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
