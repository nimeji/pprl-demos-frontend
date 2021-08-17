export default class BloomFilter {
  constructor(dataString, encoding) {
    this.filter = Buffer.from(dataString, encoding);
    this.length = this.filter.length * 8;

    this.calculateCardinality();
  }

  calculateCardinality() {
    let cardinality = 0;
    this.filter.forEach((value) => {
      for (let i = 1; i < 256; i *= 2) {
        if (value & i) {
          cardinality += 1;
        }
      }
    });

    this.cardinality = cardinality;
    this.fillgrade = cardinality / this.length;
  }

  toString(encoding='base64') {
    if (encoding === 'binary') {
      const bitstring = [];

      this.filter.forEach((value) => {
        for(let i = 128; i >= 1; i /= 2) {
          bitstring.push(value & i);
        }
        bitstring.push(' ');
      });

      return bitstring.join('');
    }

    return this.filter.toString(encoding);
  }

  diceCoefficient(other) {
    if(other.length !== this.length) throw new Error('lengths have to be equal');

    let intersection = 0;

    for(let i = 0; i < this.length; i++) {
      const a = this.filter[i];
      const b = other.filter[i];
      for(let j = 1; j < 256; j *= 2) {
        if((a & j) && (b & j)) {
          intersection += 1;
        }
      }
    }
    console.log(intersection);
    return (2.0 * intersection) / (this.cardinality + other.cardinality);
  }
}
