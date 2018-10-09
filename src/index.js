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
): Array<Interval> => {
    const availableIntervals = getAvailableIntervals(schedule);
    return availableIntervals.filter(({ start, end }) => end - start >= duration);
};

const intersectInterval = (
    intervalA: Interval,
    intervalB: Interval,
    duration: number
): ?Interval => {
    const maxStart = Math.max(intervalA.start, intervalB.start);
    const minEnd = Math.min(intervalA.end, intervalB.end);
    const availableDuration = minEnd - maxStart;
    if (availableDuration >= duration) {
        return {
            start: maxStart,
            end: minEnd,
        };
    }
};

const intersectIntervals = (
    intervalsA: Array<Interval>,
    intervalsB: Array<Interval>,
    duration: number
): Array<Interval> => {
    const sharedAvailableIntervals = [];
    intervalsA.forEach((intervalA) => {
        intervalsB.forEach((intervalB) => {
            const shared = intersectInterval(intervalA, intervalB, duration);
            if (shared != null) {
                sharedAvailableIntervals.push(shared);
            }
        });
    });
    return sharedAvailableIntervals;
};

const intersectNextIntervals = (
    sharedIntervals: Array<Interval> = [],
    availableIntervals: Array<Array<Interval>>,
    duration: number
): Array<Interval> => {
    const nextIntervals = availableIntervals.shift();
    if (nextIntervals != null) {
        const nextSharedIntervals = intersectIntervals(sharedIntervals, nextIntervals, duration);
        return intersectNextIntervals(nextSharedIntervals, availableIntervals, duration);
    }
    return sharedIntervals;
};

const intersectAllIntervals = (
    availableIntervals: Array<Array<Interval>>,
    duration: number
): Array<Interval> => {
    const firstIntervals = availableIntervals.shift();
    return intersectNextIntervals(firstIntervals, availableIntervals, duration);
};

const getSharedAvailableIntervalsForAllSchedules = (
    schedules: Array<Array<Array<string>>>,
    duration: number
): Array<Interval> => {
    const availableIntervals = schedules.map((schedule) =>
        getAvailableIntervalsFilteredByDuration(schedule, duration)
    );
    return intersectAllIntervals(availableIntervals, duration);
};

const getFirstSharedAvailableStartTimeForAllSchedules = (
    schedules: Array<Array<Array<string>>>,
    duration: number
): ?string => {
    const sharedIntervals = getSharedAvailableIntervalsForAllSchedules(schedules, duration);
    const first = sharedIntervals[0]; // NOTE: Order is preserved
    if (first != null) {
        return timeUtils.minutesToHhmm(first.start);
    }
    return null;
};

export default {
    getBookedIntervals,
    getAvailableIntervals,
    getAvailableIntervalsFilteredByDuration,
    intersectInterval,
    intersectIntervals,
    intersectNextIntervals,
    intersectAllIntervals,
    getSharedAvailableIntervalsForAllSchedules,
    getFirstSharedAvailableStartTimeForAllSchedules,
};
