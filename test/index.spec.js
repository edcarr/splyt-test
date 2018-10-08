import { expect } from "chai";
import appointments from "../src/index";

const DEFAULT_SCHEDULES = [
    [["09:00", "11:30"], ["13:30", "16:00"], ["16:00", "17:30"], ["17:45", "19:00"]],
    [["09:15", "12:00"], ["14:00", "16:30"], ["17:00", "17:30"]],
    [["11:30", "12:15"], ["15:00", "16:30"], ["17:45", "19:00"]],
];

describe("index", () => {
    describe("getBookedIntervals", () => {
        it("should return a list of formatted intervals", () => {
            const schedules = DEFAULT_SCHEDULES[0];
            const result = appointments.getBookedIntervals(schedules);
            result.forEach((r) => {
                expect(r).to.have.property("start");
                expect(r).to.have.property("end");
            });
        });
        it("should return a list of the same size as input", () => {
            const schedules = DEFAULT_SCHEDULES[0];
            const result = appointments.getBookedIntervals(schedules);
            expect(result).to.have.lengthOf(schedules.length);
        });
    });
    describe("getAvailableIntervals", () => {
        it("should return a list of formatted intervals", () => {
            const schedules = DEFAULT_SCHEDULES[0];
            const result = appointments.getAvailableIntervals(schedules);
            result.forEach((r) => {
                expect(r).to.have.property("start");
                expect(r).to.have.property("end");
            });
        });
    });
    describe("getAvailableIntervalsFilteredByDuration", () => {
        it("should return a of the same length", () => {
            const schedules = DEFAULT_SCHEDULES[0];
            const duration = 0;
            const available = appointments.getAvailableIntervals(schedules);
            const result = appointments.getAvailableIntervalsFilteredByDuration(
                schedules,
                duration
            );
            expect(result).to.have.lengthOf(available.length);
        });
        it("should return no intervals", () => {
            const schedules = DEFAULT_SCHEDULES[0];
            const duration = Number.MAX_SAFE_INTEGER;
            const result = appointments.getAvailableIntervalsFilteredByDuration(
                schedules,
                duration
            );
            expect(result).to.be.empty;
        });
        it("should return some intervals", () => {
            const schedules = DEFAULT_SCHEDULES[0];
            const available = appointments.getAvailableIntervals(schedules);
            const minDuration = available
                .map((a) => ({ duration: a.end - a.start, ...a }))
                .sort((a, b) => a.duration - b.duration)
                .filter((a) => a.duration === 0)[0].duration;
            const result = appointments.getAvailableIntervalsFilteredByDuration(
                schedules,
                minDuration
            );
            expect(result).to.not.be.empty;
        });
    });
});
