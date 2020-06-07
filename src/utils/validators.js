const isArray = function (value, func) {
    return value !== undefined &&
        Array.isArray(value) &&
        value.every(v => func(v));
};

const isDice = function (value) {
    return value !== undefined &&
        value.pips !== undefined &&
        [1, 2, 3, 4, 5, 6].indexOf(value.pips) !== -1 &&
        value.locked !== undefined;
};

const isScorecard = function (value) {
    return value !== undefined &&
        value.chance !== undefined &&
        value.ones !== undefined &&
        value.twos !== undefined &&
        value.threes !== undefined &&
        value.fours !== undefined &&
        value.fives !== undefined &&
        value.sixes !== undefined &&
        value.name !== undefined &&
        value.name !== "";
};

const isScore = function (value) {
    return value !== undefined &&
        value.name !== undefined &&
        value.name != "" &&
        value.score !== undefined &&
        value.score > 0 &&
        value.rank !== undefined &&
        value.rank > 0;
};

export { isArray, isDice, isScorecard, isScore };
