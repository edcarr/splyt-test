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

const minutesToHh = (minutes: number): string => {
    const hh = Math.floor(minutes / 60).toString();
    if (hh.length === 1) {
        return `0${hh}`;
    }
    return hh;
};

const minutesToMm = (minutes: number): string => {
    const mm = (minutes % 60).toString();
    if (mm.length === 1) {
        return `0${mm}`;
    }
    return mm;
};

const minutesToHhmm = (minutes: number): string => {
    return `${minutesToHh(minutes)}:${minutesToMm(minutes)}`;
};

const hhmmStartEndToInterval = (start: string, end: string): Interval => {
    return {
        start: hhmmToMinutes(start),
        end: hhmmToMinutes(end),
    };
};

export default {
    hhToMinutes,
    mmToMinutes,
    hhmmToMinutes,
    minutesToHh,
    minutesToMm,
    minutesToHhmm,
    hhmmStartEndToInterval,
};
