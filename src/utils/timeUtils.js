/* @flow */
import type { Interval } from "../types";

const hhToMinutes = (hh: string): number => {
    const minutes = parseInt(hh, 10) * 60;
    if (Number.isNaN(minutes)) {
        throw new Error(`malformed hh input: ${hh}`);
    }
    return minutes;
};

const mmToMinutes = (mm: string): number => {
    const minutes = parseInt(mm, 10);
    if (Number.isNaN(minutes)) {
        throw new Error(`malformed mm input: ${mm}`);
    }
    return minutes;
};

const hhmmToMinutes = (hhmm: string): number => {
    const [hh, mm] = hhmm.split(":");
    return hhToMinutes(hh) + mmToMinutes(mm);
};

const minutesToHh = (minutes: number): string => {
    if (typeof minutes !== "number") {
        throw new Error(`malformed minutes input: ${minutes}`);
    }
    const hh = Math.floor(minutes / 60).toString();
    if (hh.length === 1) {
        return `0${hh}`;
    }
    return hh;
};

const minutesToMm = (minutes: number): string => {
    if (typeof minutes !== "number") {
        throw new Error(`malformed minutes input: ${minutes}`);
    }
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
