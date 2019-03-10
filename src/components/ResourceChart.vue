<template>
  <v-card>
    <svg class='resources'/>
    <v-btn color="blue" v-on:click="sortChart">Run it</v-btn>
  </v-card>
</template>

<script>
  import * as d3 from 'd3';
  export default {
    props: ['resources', 'values', 'rd'],
    data() {
      return {
        height: 250,
        width: 500,
        top: 20,
        right: 35,
        bottom: 20,
        left: 60,
        xScale: '',
        yScale: '',
        currentsvg: '',
        counter: 0,
        hbars: '',
      }
    },
    mounted() {
      this.createGraph();
    },
    methods: {
      createGraph() {
        this.currentsvg = d3.select('.resources')
        this.currentsvg.selectAll("*").remove();
        let max = d3.max(this.resources.map((r) => {return r.quantity}));

        if (max < 10) {
          max = 10
        }

        // let height = this.height - this.top - this.bottom;
        let width = this.width - this.left - this.right;

        this.xScale = d3.scaleLinear()
          .domain([0, max])
          .range([0, width])

        this.yScale = d3.scaleLinear()
          .domain([0, this.resources.length])
          .range([this.top, this.height]);

        this.currentsvg = d3.select('.resources')
          .attr("height", this.height)
          .attr("width", this.width);
        
        // enter append method
        this.hbars = 
          this.currentsvg.selectAll('bar')
            .data(this.resources)
            .enter()
            .append('g')
        
        this.rect = 
          this.hbars.append('rect')
            .attr("class", "bar")
              .attr('x', this.left)
              .attr('y', (d, i) => {
                return this.yScale(i);
              })
              .attr('width', 0)
              .attr("height", 20)
              .attr("fill", (d) => { return d.color; })
              .transition()           // apply a transition
              .duration(3000)         // apply it over 4000 milliseconds
              .attr('width', (d) => { return this.xScale(d.quantity); }); 
        
        this.labels = 
          this.hbars.append('text')
            .attr('class', 'quantity')
            .attr("dy", ".75em")
            .attr("y", (d, i) => {return this.yScale(i) + 4})
            .attr("x", (d) => {return this.xScale(d.quantity) + this.left + 1.5})
            .attr("text-anchor", "left")
            .text((d) => {return d.quantity})
            .attr("fill", 'white')
            .transition()           // apply a transition
            .duration(4000)
            .delay(750)
            .attr("fill", (d) => {return d.color});
        
        this.legend =
          this.hbars.append('text')
            .attr('class', (d) => {return d.type + 'LL'})
            .attr("dy", ".75em")
            .attr("y", (d, i) => {return this.yScale(i) + 4})
            .attr("x", 5)
            .attr("text-anchor", "right")
            .text((d) => {return d.type})
            .attr("fill", (d) => {return d.color});
      },
      sortChart() {
        let svg = this.hbars
        // let ys = this.yScale;
        let xs = this.xScale;
        let rs = this.resources
        repeat(this.values, this.rd, rs);
        function repeat(dn, rd, rs) {
          if (dn.length > 1) {
            let diceroll = dn.pop();
            for (let j = 0; j < rd[diceroll].length; j++) {
              let ds = rd[diceroll][j].resource_type;
              rs[ds].quantity += 1;
            }
            let max = d3.max(rs.map((r) => {return r.quantity}));
            xs.domain([0, max])

            svg
              .transition()
              .selectAll('.bar')
              .duration(750)
              .attr('width', (d) => {return xs(d.quantity)})
              .on("end", function() {repeat(dn, rd, rs)})
            
            svg
              .transition()
              .selectAll('.quantity')
              .duration(750)
              .attr('x', (d) => {return xs(d.quantity) + 60 + 1.5})
              .text((d) => {return d.quantity})
              .on("end", function() {repeat(dn, rd, rs)})

             d3.select('.base_hexagon')
              .transition()
              .selectAll('.tiles')
              .duration(750)
              .style("opacity", 0.3)
              .on("end", function() {repeat(dn, rd, rs)})

            d3.select('.base_hexagon')
              .transition()
              .selectAll('.DN' + diceroll)
              .duration(750)
              .style("opacity", 1)
              .on("end", function() {repeat(dn, rd, rs)})
            
          }
        }
      },
      resetChart() {
        this.createGraph();
      }
    },
  }
</script>