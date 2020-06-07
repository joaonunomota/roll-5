export default class Scorecard {
    name = null;
    ones = null;
    twos = null;
    threes = null;
    fours = null;
    fives = null;
    sixes = null;
    threeOfAKind = null;
    fourOfAKind = null;
    fullHouse = null;
    smallStraight = null;
    largeStraight = null;
    fiveOfAKind = null;
    chance = null;

    nullToZero(value) {
        return value === null ? 0 : value;
    }

    get upper() {
        return (
            this.nullToZero(this.ones) +
            this.nullToZero(this.twos) +
            this.nullToZero(this.threes) +
            this.nullToZero(this.fours) +
            this.nullToZero(this.fives) +
            this.nullToZero(this.sixes)
        );
    }

    get bonus() {
        return this.upper >= 63 ? 35 : 0;
    }

    get lower() {
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

    get grandTotal() {
        return this.upper + this.bonus + this.lower;
    }
};
