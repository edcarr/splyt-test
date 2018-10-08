/* @flow */

const parseHourString = (hh: string): number => {
    return parseInt(hh, 10) * 60;
};

const parseMinuteString = (mm: string): number => {
    return parseInt(mm, 10);
};

const parseHourMinuteStringToInteger = (hhmm: string): number => {
    const [hh, mm] = hhmm.split(":");
    return parseHourString(hh) + parseMinuteString(mm);
};

export default {
    parseHourString,
    parseMinuteString,
    parseHourMinuteStringToInteger,
};
