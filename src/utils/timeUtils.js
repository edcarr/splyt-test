/* @flow */

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

export default {
    hhToMinutes,
    mmToMinutes,
    hhmmToMinutes,
};
