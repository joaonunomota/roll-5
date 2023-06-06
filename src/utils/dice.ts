import { type Dice } from "../types";
import { isArray, isDice } from "./validators";

const validate = (values: Dice[]) => {
  if (!isArray(values, isDice)) {
    throw new Error("Validation check failed.");
  }
};

const sort = (values: Dice[]) => {
  validate(values);

  return values.concat().sort((a, b) => a.pips - b.pips);
};

const count = (values: Dice[], value: number) => {
  validate(values);

  return values.filter((v) => v.pips === value).length;
};

const distinct = (values: Dice[]) => {
  validate(values);

  const pips = values.map((v) => v.pips);

  return [...new Set(pips)].length;
};

const hasFullHouse = (values: Dice[]) => {
  validate(values);

  const faces = [1, 2, 3, 4, 5, 6];

  return faces.some((x) => {
    return (
      count(values, x) === 3 && faces.filter((y) => y !== x).some((y) => count(values, y) === 2)
    );
  });
};

const hasSequence = (values: Dice[], length: number) => {
  validate(values);

  const result = sort(values);
  let longestSequence = 0;
  result.reduce((streak, current, index) => {
    const previous = result[index - 1];

    if (previous === undefined) {
      longestSequence = 1;
      return 1;
    } else if (current.pips === previous.pips) {
      return streak;
    } else if (current.pips !== previous.pips + 1) {
      longestSequence = streak > longestSequence ? streak : longestSequence;
      return 1;
    } else {
      streak += 1;
      longestSequence = streak > longestSequence ? streak : longestSequence;
      return streak;
    }
  }, 0);

  return longestSequence >= length;
};

const sum = (values: Dice[]) => {
  validate(values);

  const pips = values.map((v) => v.pips);

  return pips.reduce((sum, current) => sum + current, 0);
};

const sumIf = (values: Dice[], value: number) => {
  validate(values);

  const pips = values.map((v) => v.pips);

  return pips.filter((p) => p === value).reduce((sum, current) => sum + current, 0);
};

export { sort, count, distinct, hasFullHouse, hasSequence, sum, sumIf };
