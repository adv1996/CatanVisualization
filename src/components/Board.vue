<template>
  <v-card>
    <svg class='base_hexagon'/>
  </v-card>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    props: ['tiles'],
    data() {
      return {
        svg: '',
        xDiff: 125,
        yDiff: 75,
        side_length: 55,
      }
    },
    mounted() {
      this.createBoard();
    },
    methods: {
      createBoard() {
        let svg = d3.select('.base_hexagon')
          svg.selectAll("*").remove();
        this.drawBoard(600, 600);
        for (let index in this.tiles) {
          this.drawHexagon(this.tiles[index])
        }
      },
      drawBoard(height, width) {
        this.svg = d3
          .select(".base_hexagon")
          .attr("height", height)
          .attr("width", width);
      },
      drawHexagon(tile) {
        // set starting point based on row
        let starting_x = this.xDiff - tile.row * Math.cos(30 * Math.PI / 180) * this.side_length;
        let starting_y = this.yDiff + ((Math.sin(30 * Math.PI / 180) * this.side_length) * tile.orientation + this.side_length * tile.orientation)

        let hex_point_data = [
          {x: starting_x, y: starting_y},
          {x: starting_x + Math.cos(30 * Math.PI / 180) * this.side_length, y: starting_y - Math.sin(30 * Math.PI / 180) * this.side_length},
          {x: starting_x + Math.cos(30 * Math.PI / 180) * this.side_length * 2, y: starting_y},
          {x: starting_x + Math.cos(30 * Math.PI / 180) * this.side_length * 2, y: starting_y + this.side_length},
          {x: starting_x + Math.cos(30 * Math.PI / 180) * this.side_length, y: starting_y + Math.sin(30 * Math.PI / 180) * this.side_length + this.side_length},
          {x: starting_x, y: starting_y + this.side_length},
        ]

        let line = d3.line()
          .x(function(d) { return d.x; })
          .y(function(d) { return d.y; })
        
        const g = 
          this.svg.append('g')
        
        g.selectAll("path.area") //draw elements
          .data([hex_point_data]) // 10. Binds data to the line 
          .enter().append('path')
          .style("stroke", 'gold') // Assign a class for styling
          .style("stroke-width", 4) 
          .style("fill", tile.color)
          .attr("d", line) // 11. Calls the line generator  
          .attr('class', 'DN' + tile.distribution_number + ' tiles');

        g.append('circle')
          .attr('cx', starting_x + Math.cos(30 * Math.PI / 180) * this.side_length)
          .attr('cy', starting_y + (Math.sin(30 * Math.PI / 180) * this.side_length + this.side_length / 2) / 2)
          .attr('r', this.side_length / 3)
          .style('fill', 'white')
        
        g.append('text')
          .attr("x", () => {
            if (tile.distribution_number > 9) {
              return starting_x + Math.cos(30 * Math.PI / 180) * this.side_length - 6.5
            }
            return starting_x + Math.cos(30 * Math.PI / 180) * this.side_length - 4
          })
          .attr("y", starting_y + (Math.sin(30 * Math.PI / 180) * this.side_length + this.side_length / 2) / 2 + 4)
          .text(tile.distribution_number)
          .attr("font-family", "Georgia")
          .attr("font-size", "14px")
          .attr("fill", '#e34a33');
      }
    }
  }
</script>
