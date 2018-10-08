/* @flow */
import { timeUtils } from "./utils";
import { DAY } from "./constants";
import type { Interval } from "./types";

const getBookedIntervals = (schedule: Array<Array<string>>): Array<Interval> => {
    return schedule.map(([start, end]) => timeUtils.hhmmStartEndToInterval(start, end));
};

const getAvailableIntervals = (schedule: Array<Array<string>>): Array<Interval> => {
    const bookedIntervals = getBookedIntervals(schedule);
    const availableIntervals = [
        { start: timeUtils.hhmmToMinutes(DAY.START), end: bookedIntervals[0].start },
    ];
    bookedIntervals.forEach((interval, index) => {
        if (index === bookedIntervals.length - 1) {
            availableIntervals.push({
                start: interval.end,
                end: timeUtils.hhmmToMinutes(DAY.END),
            });
        } else {
            availableIntervals.push({
                start: interval.end,
                end: bookedIntervals[index + 1].start,
            });
        }
    });
    return availableIntervals;
};

const getAvailableIntervalsFilteredByDuration = (
    schedule: Array<Array<string>>,
    duration: number
) => {
    const availableIntervals = getAvailableIntervals(schedule);
    return availableIntervals.filter(({ start, end }) => end - start >= duration);
};

export default {
    getBookedIntervals,
    getAvailableIntervals,
    getAvailableIntervalsFilteredByDuration,
};
