<template>
  <v-app>
    <v-content>
      <v-container grid-list-md>
        <v-layout row wrap justify-space-around>
          <v-flex d-flex md5>
            <v-layout row wrap>
              <v-flex d-flex>
                <ResourceChart v-if="values" :resources="resources" :values="values" :rd="rd"/>
              </v-flex>
              <v-flex d-flex>
                <Histogram v-if="values" :values="values"/>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex md5 offset-md1>
            <v-flex d-flex>
              <Map v-if="resources" :tiles="tiles"/>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Map from './components/Board'
import Histogram from './components/Histogram'
import ResourceChart from './components/ResourceChart'
import Board from './components/Board/Board.js'
import * as d3 from 'd3';
import {chain} from 'lodash';

export default {
  name: 'App',
  components: {
    Map,
    Histogram,
    ResourceChart,
  },
  data () {
    return {
      tiles: null,
      resources:  [
        {
          'type': 'Sheep',
          'quantity': 0,
          'color': '#a6d854',
        },
        {
          'type': 'Wood',
          'quantity': 0,
          'color': '#2ca25f',
        },
        {
          'type': 'Brick',
          'quantity': 0,
          'color': '#e34a33',
        },
        {
          'type': 'Grain',
          'quantity': 0,
          'color': '#fec44f',
        },
        {
          'type': 'Ore',
          'quantity': 0,
          'color': '#636363',
        },
        {
          'type': 'Robber',
          'quantity': 0,
          'color': '#000000',
        },
      ],
      rd: null,
      num_rolls: 100,
      values: null,
    }
  },
  created() {
    let game = new Board();
    this.tiles = game.createTiles();
    this.rd = chain(this.tiles)
      .groupBy('distribution_number')
      .value();
    this.values = d3.range(this.num_rolls).map(() => {return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1});
  },
}
</script>
