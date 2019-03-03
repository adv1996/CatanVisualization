<template>
  <v-flex>
    <v-card-title primary-title>
      <div>
        <span class="headline">Distribution {{num_rolls}}</span>
      </div>
      <v-btn color="steelblue" v-on:click="drawHistogram">ReRoll</v-btn>
    </v-card-title>
    <svg class='histogram'/>
  </v-flex>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    data() {
      return {
        height: 400,
        width: 500,
        top: 20,
        right: 30,
        bottom: 20,
        left: 30,
        num_rolls: 1000
      }
    },
    mounted() {
      this.drawHistogram();
    },
    methods: {
      drawHistogram() {
        let currentsvg = d3.select('.histogram')
        currentsvg.selectAll("*").remove();
        let color = 'steelblue'
        let values = d3.range(this.num_rolls).map(() => {return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1});
        let max = d3.max(values);
        let min = d3.min(values);
        let height = this.height - this.top - this.bottom
        let width = this.width - this.left - this.right
        let xScale = d3.scaleLinear()
          .domain([min, max])
          .range([0, width])
        let histogram = d3.histogram()
          .domain(xScale.domain())
          .thresholds(xScale.ticks(11));

        let data = histogram(values)
        
        let yMax = d3.max(data, (d) => {return d.length});
        let yMin = d3.min(data, (d) => {return d.length});

        let colorScale = d3.scaleLinear()
          .domain([yMin, yMax])
          .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);
        
        let yScale = d3.scaleLinear()
          .domain([0, yMax])
          .range([height, this.top]);

        const svg = d3.select('.histogram')
          .attr("height", this.height)
          .attr("width", this.width);

        svg.append("g")
          .style("font", "0.75em arial")
          .attr("transform", "translate(" + (xScale(1) - xScale(0)) / 2 + "," + (height) + ")")
          .call(d3.axisBottom(xScale))
        
        let bar = svg.selectAll(".bar")
          .data(data)
          .enter().append("g")
          .attr("class", "bar")
          .attr("transform", (d) => { 
            return "translate(" + xScale(d[0]) + "," + yScale(d.length) + ")";
          });
        
        bar.append("rect")
          .attr("x", 1)
          .attr("width", xScale(1) - xScale(0))
          .attr("height", function(d) { return height - yScale(d.length); })
          .attr("fill", function(d) { return colorScale(d.length) });

        bar.append("text")
          .attr("dy", ".75em")
          .attr("y", -12)
          .attr("x", (xScale(1) - xScale(0)) / 2)
          .attr("text-anchor", "middle")
          .text(function(d) { return d.length; });
      }
    }
  }
</script>

<style>
.bar rect {
  shape-rendering: crispEdges;
}

.bar text {
  fill: #999999;
}

.axis path, .axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}
</style>