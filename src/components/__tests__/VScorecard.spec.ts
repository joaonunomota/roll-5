import { describe, it } from "vitest";
import { render, screen } from "@testing-library/vue";
import VScorecard from "../VScorecard.vue";
import { Scorecard } from "../../utils";

describe("VScorecard", () => {
  it("displays correct score for aces", () => {
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

  it("displays correct score for twos", () => {
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

  it("displays correct score for threes", () => {
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

  it("displays correct score for fours", () => {
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

  it("displays correct score for fives", () => {
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

  it("displays correct score for sixes", () => {
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

  it("displays correct score for 3 of a kind", () => {
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

  it("displays correct score for 4 of a kind", () => {
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

  it("displays correct score for full house", () => {
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

  it("displays correct score for small straight", () => {
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

  it("displays correct score for large straight", () => {
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

  it("displays correct score for 5 of a kind", () => {
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

  it("displays correct score for chance", () => {
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
