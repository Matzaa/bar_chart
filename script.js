(function () {
    fetch(
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    )
        .then((response) => response.json())
        .then(({ data }) => {
            makeChart(data);
        });

    function makeChart(data) {
        const h = 500;
        const w = 1000;
        const padding = 100;
        const barW = w / data.length / 2;

        var yearsDate = data.map((item) => {
            return new Date(item[0]);
        });

        // base svg

        const svg = d3
            .select("body")
            .append("svg")
            .attr("width", w + "px")
            .attr("height", h + "px")
            .style("background-color", "pink");

        //scales

        const yHeightScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d[1])])
            .range([padding, h - padding]);

        const xScale = d3
            .scaleTime()
            .domain([d3.min(yearsDate), d3.max(yearsDate)])
            .range([padding, w - padding]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d[1])])
            .range([h - padding, padding]);

        // tooltip

        let tooltip = d3
            .select("body")
            .append("div")
            .attr("id", "tooltip")
            .style("width", 100)
            .style("height", 50)
            .style("z-index", "10")
            .style("visibility", "hidden")
            .text("");

        // bars

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(yearsDate[i]))
            .attr("y", (d) => yScale(d[1]))
            .attr("fill", "beige")
            .attr("class", "bar")
            .attr("data-date", (d, i) => data[i][0])
            .attr("data-gdp", (d) => d[1])
            .attr("i", (d, i) => i)
            .attr("width", barW)
            .attr("height", (d, i) => yHeightScale(d[1]) - padding)
            .on("mouseover", function (event, i) {
                tooltip
                    .style("left", event.pageX - 95 + "px")
                    .style("top", h - 100 + "px")
                    .style("transform", "translateX(100px)")
                    .attr("data-date", this.getAttribute("data-date"));
                tooltip.attr("data-gdp", this.getAttribute("data-gdp"));
                tooltip.style("visibility", "visible");
                tooltip.html(
                    `<p> $ ${this.getAttribute(
                        "data-gdp"
                    )} billion </p><p> ${this.getAttribute("data-date")} </p>`
                );
            })
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");
            });

        // create axis

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("transform", `translate(0, ${h - padding})`)
            .attr("id", "x-axis")
            .call(xAxis);

        svg.append("g")
            .attr("transform", `translate(${padding}, 0)`)
            .attr("id", "y-axis")
            .call(yAxis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -260)
            .attr("y", 40)
            .text("GDP")
            .attr("class", "text");

        svg.append("text")
            .attr("x", w / 2 - padding / 2)
            .attr("y", h - padding / 2)
            .text("YEARS")
            .attr("class", "text");
    }
})();
