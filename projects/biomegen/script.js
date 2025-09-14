import { projects } from "/data-loader.js";

// Getting Number of Lines Left

var urlName =
    "https://raw.githubusercontent.com/Liam-Ralph/biomegen/refs/heads/c-rewrite/main_left.txt";
var response = await fetch(urlName);
const fileText = await response.text();
const linesLeft = fileText.split("\n").length;

// Calculating Progress Percentage

const linesTotal = projects[0].linesList[0];
const progress = (linesTotal - linesLeft) / linesTotal;

// Updating Progress bar

var barInner = document.getElementById("c-rewrite-progress-bar-inner");
barInner.textContent =
    "C Rewrite Progress: " + Math.round(progress * 1000) / 10 + "%";
barInner.style.width =
    (document.getElementById("c-rewrite-progress-bar").offsetWidth * progress - 20) + "px";