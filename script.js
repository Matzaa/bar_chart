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
        const svg = d3
            .select("body")
            .append("svg")
            .attr("width", w + "px")
            .attr("height", h + "px")
            .style("background-color", "pink");
        const padding = 50;
        const barW = w / data.length / 2;
        // create x & y scales
        var years = data.map((item) => {
            var quarter;
            var temp = item[0].substring(5, 7);

            if (temp === "01") {
                quarter = "Q1";
            } else if (temp === "04") {
                quarter = "Q2";
            } else if (temp === "07") {
                quarter = "Q3";
            } else if (temp === "10") {
                quarter = "Q4";
            }

            return item[0].substring(0, 4) + " " + quarter;
        });

        var yearsDate = data.map((item) => {
            return new Date(item[0]);
        });

        console.log("years ", years);

        const xWidthScale = d3
            .scaleLinear()
            .domain([0, data.length])
            .range([padding, w - padding]);

        const yHeightScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d[1])])
            .range([padding, h - padding]);

        const xScale = d3
            .scaleTime()
            .domain([d3.min(yearsDate), d3.max(data, (d) => d[0].slice(0, 4))])
            .range([padding, w - padding]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d[1])])
            .range([h - padding, padding]);

        // bars

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
            .attr("data-date", (d) => d[0].slice(0, 4))
            .attr("data-gdp", (d) => d[1])
            // .append("title")
            // .attr("id", "tooltip")
            // .text((d) => `${d[0].slice(0, 4)}, ${d[1]}`);
            .on("mouseover", (d) => {
                // console.log("i ", d);
                const tooltip = document.getElementById("tooltip");
                tooltip.setAttribute(
                    "x",
                    document.getElementsByClassName("bar")[0].getAttribute("x")
                );
                tooltip.setAttribute("y", h - padding * 2);
            });
        // tooltip

        svg.append("rect")
            .attr("id", "tooltip")
            .attr("width", 100)
            .attr("height", 100);

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
    }
})();
