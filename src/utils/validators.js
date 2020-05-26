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
    return value !== undefined && value.chance !== undefined;
};

export { isArray, isDice, isScorecard }