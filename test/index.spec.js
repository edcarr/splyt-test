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
    describe("intersectInterval", () => {
        it("should retrun a interval of max start and min end of 2 intervals", () => {
            const intervalA = {
                start: 100,
                end: 200,
            };
            const intervalB = {
                start: 50,
                end: 150,
            };
            const expected = {
                start: 100,
                end: 150,
            };
            const duration = 50;
            const result = appointments.intersectInterval(intervalA, intervalB, duration);
            expect(result).to.deep.equal(expected);
        });
        it("should return undefined", () => {
            const intervalA = {
                start: 150,
                end: 200,
            };
            const intervalB = {
                start: 50,
                end: 150,
            };
            const duration = 50;
            const result = appointments.intersectInterval(intervalA, intervalB, duration);
            expect(result).to.be.undefined;
        });
    });
    describe("intersectIntervals", () => {
        it("should retrun an array of over lapping intervals", () => {
            const duration = 50;
            const intervalsA = [
                {
                    start: 100,
                    end: 200,
                },
                {
                    start: 500,
                    end: 600,
                },
            ];
            const intervalsB = [
                {
                    start: 50,
                    end: 150,
                },
                {
                    start: 550,
                    end: 600,
                },
            ];
            expect(
                appointments.intersectIntervals(intervalsA, intervalsB, duration)
            ).to.be.lengthOf(intervalsA.length);
            const intervalsC = [
                {
                    start: 100,
                    end: 200,
                },
                {
                    start: 700,
                    end: 800,
                },
            ];
            const intervalsD = [
                {
                    start: 50,
                    end: 150,
                },
                {
                    start: 550,
                    end: 600,
                },
            ];
            expect(
                appointments.intersectIntervals(intervalsC, intervalsD, duration)
            ).to.be.lengthOf(1);
        });
        it("should return no items as there are no overlapping intervals", () => {
            const duration = 100;
            const intervalsA = [
                {
                    start: 100,
                    end: 200,
                },
                {
                    start: 500,
                    end: 600,
                },
            ];
            const intervalsB = [
                {
                    start: 50,
                    end: 150,
                },
                {
                    start: 550,
                    end: 600,
                },
            ];
            expect(appointments.intersectIntervals(intervalsA, intervalsB, duration)).to.be.empty;
        });
    });
    describe("intersectNextIntervals", () => {
        it("should give array of same size", () => {
            const duration = 50;
            const intervalsA = [
                {
                    start: 100,
                    end: 200,
                },
                {
                    start: 500,
                    end: 600,
                },
            ];
            const availableIntervals = [
                [
                    {
                        start: 50,
                        end: 150,
                    },
                    {
                        start: 550,
                        end: 600,
                    },
                ],
            ];
            expect(
                appointments.intersectNextIntervals(intervalsA, availableIntervals, duration)
            ).to.be.lengthOf(intervalsA.length);
        });
        it("should return an empty array", () => {
            const duration = Number.MAX_SAFE_INTEGER;
            const intervalsA = [
                {
                    start: 100,
                    end: 200,
                },
                {
                    start: 500,
                    end: 600,
                },
            ];
            const availableIntervals = [
                [
                    {
                        start: 50,
                        end: 150,
                    },
                    {
                        start: 550,
                        end: 600,
                    },
                ],
            ];
            const result = appointments.intersectNextIntervals(
                intervalsA,
                availableIntervals,
                duration
            );
            expect(result).to.be.empty;
        });
        it("should accept and empty array", () => {
            const result = appointments.intersectNextIntervals([], [], 50);
            expect(result).to.be.empty;
        });
    });
    describe("intersectAllIntervals", () => {
        it("should accept and empty array and return an empty array", () => {
            const result = appointments.intersectAllIntervals([], [], 50);
            expect(result).to.be.empty;
        });
    });
    describe("getSharedAvailableIntervalsForAllSchedules", () => {
        it("should return an array", () => {
            const duration = 60;
            const schedules = DEFAULT_SCHEDULES;
            const result = appointments.getSharedAvailableIntervalsForAllSchedules(
                schedules,
                duration
            );
            expect(result).to.be.a("array");
        });
        it("should take a list schedules and find available intervals", () => {
            const duration = 60;
            const schedules = DEFAULT_SCHEDULES;
            expect(appointments.getSharedAvailableIntervalsForAllSchedules(schedules, duration)).to
                .not.be.empty;
        });
        it("should a empty list and not throw", () => {
            const duration = 60;
            const schedules = [];
            const result = appointments.getSharedAvailableIntervalsForAllSchedules(
                schedules,
                duration
            );
            expect(result).to.be.empty;
        });
    });
    describe("getFirstSharedAvailableStartTimeForAllSchedules", () => {
        it("should return a string", () => {
            const duration = 60;
            const schedules = DEFAULT_SCHEDULES;
            const result = appointments.getFirstSharedAvailableStartTimeForAllSchedules(
                schedules,
                duration
            );
            expect(result).to.be.a("string");
        });
        it("should return null", () => {
            const duration = Number.MAX_SAFE_INTEGER;
            const schedules = DEFAULT_SCHEDULES;
            const result = appointments.getFirstSharedAvailableStartTimeForAllSchedules(
                schedules,
                duration
            );
            expect(result).to.be.null;
        });
        it("should return a hh:mm format string", () => {
            const duration = 60;
            const schedules = DEFAULT_SCHEDULES;
            const result = appointments.getFirstSharedAvailableStartTimeForAllSchedules(
                schedules,
                duration
            );
            expect(result).to.have.lengthOf(5);
            expect(result).to.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
        });
    });
});
