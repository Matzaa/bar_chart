(function () {
    const h = 500;
    const w = 1000;

    fetch(
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    )
        .then((response) => response.json())
        .then(({ data }) => {
            console.log("data: ", data);

            // creating the graph itself

            const padding = 50;
            const barW = 2;
            // create x & y scales
            console.log("data length", data.length);
            console.log(
                "max vak",
                d3.max(data, (d, i) => {
                    console.log("i:", i, d[1]);
                    return d[1];
                })
            );
            const xWidthScale = d3
                .scaleLinear()
                .domain([0, data.length])
                .range([padding, w - padding]);

            const yHeightScale = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d[1])])
                .range([padding, h - padding]);

            const xScale = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d[0])])
                .range([padding, 1000 - padding]);

            const yScale = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d[1])])
                .range([h - padding, padding]);

            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", (d, i) => xWidthScale(i))
                .attr("y", (d) => yScale(d[1]))
                .attr("width", barW)
                .attr("height", (d, i) => yHeightScale(d[1]) - padding)
                .attr("fill", "beige")
                .attr("class", "bar")
                .append("title")
                .text((d) => `${d[0]}, ${d[1]}`);

            // create axis

            const xAxis = d3.axisBottom(xWidthScale);
            const yAxis = d3.axisLeft(yScale);

            svg.append("g")
                .attr("transform", `translate(0, ${h - padding})`)
                .attr("id", "x-axis")
                .call(xAxis);

            svg.append("g")
                .attr("transform", `translate(${padding}, 0)`)
                .attr("id", "y-axis")
                .call(yAxis);
        });

    const svg = d3
        .select("body")
        .append("svg")
        .attr("width", w + "px")
        .attr("height", h + "px")
        .style("background-color", "pink");
})();
