import { describe, it } from "vitest";
import { render, screen } from "@testing-library/vue";
import VDice from "../VDice.vue";

describe("VDice", () => {
  it("has alt text for single pip", () => {
    render(VDice, { props: { modelValue: { pips: 1, locked: false }, disabled: false } });
    screen.getByAltText("A dice with one pip");
  });

  it("has alt text for multiple pips", () => {
    render(VDice, { props: { modelValue: { pips: 2, locked: false }, disabled: false } });
    screen.getByAltText("A dice with two pips");
  });

  it("has alt text when locked", () => {
    render(VDice, { props: { modelValue: { pips: 1, locked: false }, disabled: false } });
    screen.getByAltText("An open lock, dice is re-rolled. Press to lock.");
  });

  it("has alt text when unlocked", () => {
    render(VDice, { props: { modelValue: { pips: 1, locked: true }, disabled: false } });
    screen.getByAltText("A closed lock, dice is not re-rolled. Press to unlock.");
  });
});
