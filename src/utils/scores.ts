import type { Score } from "../types";

const high = "highscores";
const low = "lowscores";

const scores = (table: typeof high | typeof low) => {
  const result = localStorage.getItem(table);

  return !result ? [] : JSON.parse(result);
};

const asc = (a: Score, b: Score) => a.score - b.score;
const desc = (a: Score, b: Score) => b.score - a.score;

const setScore = (table: typeof high | typeof low, candidate: Score) => {
  const storage = localStorage.getItem(table);
  const results: Score[] = storage ? JSON.parse(storage) : [];

  results.push(candidate);
  results.sort(table === high ? desc : asc);
  results.splice(5);

  localStorage.setItem(table, JSON.stringify(results));
};

export { high, low, scores, setScore };
