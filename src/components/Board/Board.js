import Tile from '../Tiles/Tile.js'

export default class Board {
  constructor() {
    this.resources = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5]
    this.distribution = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
    this.rows = [3, 4, 5, 4, 3]
  }
  createTiles() {
    // create first row with 3 tiles
    let resourceSetUp = this.shuffle(this.resources);
    let probability_tokens = this.shuffle(this.distribution);
    // make sure numbers rotate around board (need to keep standard distribution)
    let tiles = []
    for (let i = 0; i < this.rows.length; i++) {
      for (let j = 0; j < this.rows[i]; j++) {
        let shift_right = i
        let resource = resourceSetUp.pop()
        let prob = ''
        if (resource === 5) {
          prob = 7
        } else {
          prob = probability_tokens.pop()
        }
        if (i === 3) {
          shift_right = i - 2
        }
        if (i === 4) {
          shift_right = i - 4
        }
        tiles.push(new Tile(
          resource,
          prob,
          j * -2 + shift_right,
          i,
        ));
      }
    }
    return tiles;
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
}