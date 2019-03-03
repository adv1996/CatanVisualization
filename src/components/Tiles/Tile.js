export default class Tile {
  constructor(
    resource_type,
    distribution_number,
    row,
    orientation,
  ) {
    this.resource_type = resource_type;
    this.distribution_number = distribution_number;
    this.row = row;
    this.orientation = orientation;
  }

  get color() {
    if (this.resource_type === 0) {
      return '#a6d854';
    } else if (this.resource_type === 1) {
      return '#2ca25f';
    } else if (this.resource_type === 2) {
      return '#fec44f';
    } else if (this.resource_type === 3) {
      return '#636363';
    } else if (this.resource_type === 4) {
      return '#e34a33';
    }
    return '#7f2704'
  }
}