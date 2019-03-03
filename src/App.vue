<template>
  <v-app>
    <v-content>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex d-flex md6 >
            <Board/>
          </v-flex>
          <v-flex md6>
            <Histogram/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Board from './components/Board'
import Histogram from './components/Histogram'

export default {
  name: 'App',
  components: {
    Board,
    Histogram,
  },
  data () {
    return {
      //
    }
  }
}
</script>
