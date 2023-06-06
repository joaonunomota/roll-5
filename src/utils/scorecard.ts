export default class Scorecard {
  name: number | null = null;
  ones: number | null = null;
  twos: number | null = null;
  threes: number | null = null;
  fours: number | null = null;
  fives: number | null = null;
  sixes: number | null = null;
  threeOfAKind: number | null = null;
  fourOfAKind: number | null = null;
  fullHouse: number | null = null;
  smallStraight: number | null = null;
  largeStraight: number | null = null;
  fiveOfAKind: number | null = null;
  chance: number | null = null;

  nullToZero(value: number | null) {
    return value === null ? 0 : value;
  }

  get upper(): number {
    return (
      this.nullToZero(this.ones) +
      this.nullToZero(this.twos) +
      this.nullToZero(this.threes) +
      this.nullToZero(this.fours) +
      this.nullToZero(this.fives) +
      this.nullToZero(this.sixes)
    );
  }

  get bonus(): number {
    return this.upper >= 63 ? 35 : 0;
  }

  get lower(): number {
    return (
      this.nullToZero(this.threeOfAKind) +
      this.nullToZero(this.fourOfAKind) +
      this.nullToZero(this.fullHouse) +
      this.nullToZero(this.smallStraight) +
      this.nullToZero(this.largeStraight) +
      this.nullToZero(this.fiveOfAKind) +
      this.nullToZero(this.chance)
    );
  }

  get total(): number {
    return this.upper + this.bonus + this.lower;
  }
}
