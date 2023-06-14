import type { Score } from "../types";

const high = "highscores";
const low = "lowscores";

const scores = (table: string) => {
  const result = localStorage.getItem(table === high ? high : low);

  return !result ? [] : JSON.parse(result);
};

const setScore = (table: string, candidate: Score) => {
  const storage = localStorage.getItem(table === high ? high : low);
  const results: Score[] = !storage ? [] : JSON.parse(storage);

  results.push(candidate);
  results.sort((a, b) => (a.score < b.score ? 1 : 0));
  results.splice(5);

  localStorage.setItem(table, JSON.stringify(results));
};

export { high, low, scores, setScore };
