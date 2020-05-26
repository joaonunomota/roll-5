import { isArray, isDice } from "./validators";

const validate = function (values) {
    if (!isArray(values, isDice)) {
        throw new Error("Invalid array, not all items dice.");
    }
};

const sort = function (values) {
    validate(values);

    let result = values;
    result.sort((a, b) => a.pips - b.pips);

    return result;
};

const count = function (values, value) {
    validate(values);

    return values.filter(v => v.pips === value).length;
};

const distinct = function (values) {
    validate(values);

    const pips = values.map(v => v.pips);

    return [...new Set(pips)].length;
};

const hasFullHouse = function (values) {
    validate(values);

    return [1, 2, 3, 4, 5, 6].some(v => count(values, v) === 3) ||
        [1, 2, 3, 4, 5, 6].some(v => count(values, v) === 2);
};

const hasSequence = function (values, length) {
    validate(values);

    return sort(values).some((value, index) => value === values[index + (length - 1)].pips);
};

const sum = function (values) {
    validate(values);

    const pips = values.map(v => v.pips);

    return pips.reduce((sum, current) => sum + current, 0);
};

const sumIf = function (values, value) {
    validate(values);

    const pips = values.map(v => v.pips);

    return pips.filter(p => p === value).reduce((sum, current) => sum + current, 0);
};

export { sort, count, distinct, hasFullHouse, hasSequence, sum, sumIf };
