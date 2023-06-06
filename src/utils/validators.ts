import type Scorecard from "./scorecard";
import { type Dice, type Score } from "../types";

const isArray = <T>(value: T[], func: (v: T) => boolean) => {
  return value !== undefined && Array.isArray(value) && value.every(func);
};

const isDice = (value: Dice) => {
  return (
    value !== undefined &&
    value.pips !== undefined &&
    [1, 2, 3, 4, 5, 6].indexOf(value.pips) !== -1 &&
    value.locked !== undefined
  );
};

const isScorecard = (value: Scorecard) => {
  return (
    value !== undefined &&
    value.chance !== undefined &&
    value.ones !== undefined &&
    value.twos !== undefined &&
    value.threes !== undefined &&
    value.fours !== undefined &&
    value.fives !== undefined &&
    value.sixes !== undefined &&
    value.name !== undefined &&
    value.name !== ""
  );
};

const isScore = (value: Score) => {
  return (
    value !== undefined &&
    value.name !== undefined &&
    value.name !== "" &&
    value.score !== undefined &&
    value.score > 0
  );
};

export { isArray, isDice, isScorecard, isScore };
