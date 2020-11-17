console.log("hey");

const dataset = "";

const svg = d3
    .select("body")
    .append("svg")
    .attr("width", 700 + "px")
    .attr("height", 300 + "px")
    .style("background-color", "pink");

fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
    .then((response) => response.json())
    .then((data) => {
        console.log("data: ", data);
    });
