/* @flow */
import type { Interval } from "../types";

const hhToMinutes = (hh: string): number => {
    return parseInt(hh, 10) * 60;
};

const mmToMinutes = (mm: string): number => {
    return parseInt(mm, 10);
};

const hhmmToMinutes = (hhmm: string): number => {
    const [hh, mm] = hhmm.split(":");
    return hhToMinutes(hh) + mmToMinutes(mm);
};

const hhmmIntervalToMinutes = (start: string, end: string): Interval => {
    return {
        start: hhmmToMinutes(start),
        end: hhmmToMinutes(end),
    };
};

export default {
    hhToMinutes,
    mmToMinutes,
    hhmmToMinutes,
    hhmmIntervalToMinutes,
};
