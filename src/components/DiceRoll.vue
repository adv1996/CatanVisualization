<template>
  <v-card>
    <v-btn color="blue" v-on:click="createSlot">Run it</v-btn>
    <svg class="diceRoll"/>
  </v-card>
</template>

<script>
  import * as d3 from 'd3';
  import { interval } from 'rxjs';
  import { take } from 'rxjs/operators';

  export default {
    props: ['values', 'resources', 'rd'],
    data() {
      return {
        height: 100,
        width: 100,
      }
    },
    methods: {
      createSlot() {
        this.svg = d3.select('.diceRoll')
          .attr('height', this.height)
          .attr('width', this.width)
          .style('background', 'orange')
        
        
        this.svg.append('text')
          .attr('class', 'test')
          .attr('x', 50)
          .attr('y', 50)
          .text(0)
        let rate = 500
        const numbers = interval(rate);
 
        const takeFourNumbers = numbers.pipe(take(this.values.length));
        let xs = d3.scaleLinear()
          .domain([0, 300])
          .range([20, 250])
        takeFourNumbers.subscribe(
          x => {
            for (let j = 0; j < this.rd[this.values[x]].length; j++) {
              let ds = this.rd[this.values[x]][j].resource_type;
              this.resources[ds].quantity += 1;
            }
            let max = d3.max(this.resources.map((r) => {return r.quantity}));
            xs.domain([0, max])

            this.svg.select('.test')
              .transition()
              .duration(rate)
              .text(this.values[x])

            d3.select('.base_hexagon')
              .transition()
              .selectAll('.tiles')
              .duration(rate)
              .style("opacity", 0.1)

            d3.select('.base_hexagon')
              .transition()
              .selectAll('.DN' + this.values[x])
              .duration(rate)
              .style("opacity", 1)

            d3.select('.resources')
              .transition()
              .selectAll('.bar')
              .duration(rate)
              .attr('width', (d, i) => {
                return xs(this.resources[i].quantity)
              })
            
            d3.select('.resources')
              .transition()
              .selectAll('.quantity')
              .duration(rate)
              .attr('x', (d,i) => {return xs(this.resources[i].quantity) + 60 + 1.5})
              .text((d,i) => {return this.resources[i].quantity})
          }
        );
      }
    }
  }
</script>

<style scoped>

</style>