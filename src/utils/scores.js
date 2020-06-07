const high = "highscores";
const low = "lowscores";

const scores = function (table) {
    const result = localStorage.getItem(table === high ? high : low);

    return !result ? [] : JSON.parse(result);
};

const setScore = function (table, candidate) {
    const storage = localStorage.getItem(table === high ? high : low);
    let results = !storage ? [] : JSON.parse(storage);

    results.push(candidate);
    results.sort((a, b) => a.score < b.score);
    results.splice(5);

    localStorage.setItem(table, JSON.stringify(results));
};

export { high, low, scores, setScore };
