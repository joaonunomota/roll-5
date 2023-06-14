import { describe, it } from "vitest";
import { render, screen } from "@testing-library/vue";
import VScorecard from "../VScorecard.vue";
import { Scorecard } from "../../utils";

describe("VScorecard", () => {
  describe("displays correct score for", () => {
    it("aces", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 1, locked: false },
            { pips: 1, locked: false },
            { pips: 1, locked: false },
            { pips: 1, locked: false },
            { pips: 1, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Aces 5" });
    });

    it("twos", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 2, locked: false },
            { pips: 2, locked: false },
            { pips: 2, locked: false },
            { pips: 2, locked: false },
            { pips: 2, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Twos 10" });
    });

    it("threes", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 3, locked: false },
            { pips: 3, locked: false },
            { pips: 3, locked: false },
            { pips: 3, locked: false },
            { pips: 3, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Threes 15" });
    });

    it("fours", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 4, locked: false },
            { pips: 4, locked: false },
            { pips: 4, locked: false },
            { pips: 4, locked: false },
            { pips: 4, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Fours 20" });
    });

    it("fives", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 5, locked: false },
            { pips: 5, locked: false },
            { pips: 5, locked: false },
            { pips: 5, locked: false },
            { pips: 5, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Fives 25" });
    });

    it("sixes", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Sixes 30" });
    });

    it("3 of a kind", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 1, locked: false },
            { pips: 1, locked: false },
            { pips: 1, locked: false },
            { pips: 1, locked: false },
            { pips: 1, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "3 of a Kind 5" });
    });

    it("4 of a kind", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 2, locked: false },
            { pips: 2, locked: false },
            { pips: 2, locked: false },
            { pips: 2, locked: false },
            { pips: 2, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "4 of a Kind 10" });
    });

    it("full house", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 3, locked: false },
            { pips: 3, locked: false },
            { pips: 4, locked: false },
            { pips: 4, locked: false },
            { pips: 4, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Full House 25" });
    });

    it("small straight", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 1, locked: false },
            { pips: 2, locked: false },
            { pips: 3, locked: false },
            { pips: 4, locked: false },
            { pips: 5, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Small Straight 30" });
    });

    it("large straight", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 1, locked: false },
            { pips: 2, locked: false },
            { pips: 3, locked: false },
            { pips: 4, locked: false },
            { pips: 5, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Large Straight 40" });
    });

    it("5 of a kind", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 5, locked: false },
            { pips: 5, locked: false },
            { pips: 5, locked: false },
            { pips: 5, locked: false },
            { pips: 5, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "ROLL 5 (5 of a Kind) 50" });
    });

    it("chance", () => {
      render(VScorecard, {
        props: {
          value: new Scorecard(),
          dice: [
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Chance 30" });
    });
  });

  describe("displays correct computed total for", () => {
    describe("bonus", () => {
      it("under threshold", () => {
        const scorecard = Object.assign(new Scorecard(), {
          ones: 0,
          twos: 0,
          threes: 0,
          fours: 0,
          fives: 0,
          sixes: 0
        });

        render(VScorecard, {
          props: {
            value: scorecard,
            dice: [
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false }
            ],
            readonly: false
          }
        });

        screen.getByRole("row", { name: "Bonus 0" });
      });

      it("over threshold", () => {
        const scorecard = Object.assign(new Scorecard(), {
          ones: 3,
          twos: 6,
          threes: 9,
          fours: 12,
          fives: 15,
          sixes: 18
        });

        render(VScorecard, {
          props: {
            value: scorecard,
            dice: [
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false }
            ],
            readonly: false
          }
        });

        screen.getByRole("row", { name: "Bonus 35" });
      });
    });

    describe("upper", () => {
      it("without bonus", () => {
        const scorecard = Object.assign(new Scorecard(), {
          ones: 0,
          twos: 0,
          threes: 0,
          fours: 0,
          fives: 0,
          sixes: 18
        });

        render(VScorecard, {
          props: {
            value: scorecard,
            dice: [
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false }
            ],
            readonly: false
          }
        });

        screen.getByRole("row", { name: "Total (Upper Section) 18" });
      });

      it("with bonus", () => {
        const scorecard = Object.assign(new Scorecard(), {
          ones: 3,
          twos: 6,
          threes: 9,
          fours: 12,
          fives: 15,
          sixes: 18
        });

        render(VScorecard, {
          props: {
            value: scorecard,
            dice: [
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false },
              { pips: 6, locked: false }
            ],
            readonly: false
          }
        });

        screen.getByRole("row", { name: "Total (Upper Section) 98" });
      });
    });

    it("lower", () => {
      const scorecard = Object.assign(new Scorecard(), {
        chance: 15,
        fullHouse: 25
      });

      render(VScorecard, {
        props: {
          value: scorecard,
          dice: [
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Total (Lower Section) 40" });
    });

    it("total", () => {
      const scorecard = Object.assign(new Scorecard(), {
        twos: 10,
        chance: 15,
        fullHouse: 25
      });

      render(VScorecard, {
        props: {
          value: scorecard,
          dice: [
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false },
            { pips: 6, locked: false }
          ],
          readonly: false
        }
      });

      screen.getByRole("row", { name: "Grand Total 50" });
    });
  });
});
