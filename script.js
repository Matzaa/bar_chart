console.log("hey");

const scale = d3.scaleLinear();
const output = scale(50);
scale.domain([]).range([]);

fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
    .then((response) => response.json())
    .then(({ data }) => {
        console.log("data: ", data);

        // creating the graph itself
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => {
                return i * 30;
            })
            .attr("y", 0)
            .attr("width", 20)
            .attr("height", (d, i) => {
                return 3;
            });
        console.log("dataset: ", dataset);
        console.log(
            "min: ",
            d3.min(data, (d) => d[1])
        );
    });

const svg = d3
    .select("body")
    .append("svg")
    .attr("width", 1000 + "px")
    .attr("height", 500 + "px")
    .style("background-color", "pink");

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
        return i * 30;
    })
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", (d, i) => {
        return 3;
    });
console.log("dataset: ", dataset);
console.log("min: ", d3.min(dataset));
