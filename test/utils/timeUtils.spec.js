import { expect } from "chai";
import { timeUtils } from "../../src/utils";

describe("timeUtils", () => {
    describe("hhToMinutes", () => {
        it("should return a number", () => {
            const hourString = "01";
            expect(typeof timeUtils.hhToMinutes(hourString)).to.equal("number");
        });
        it("should return hours in minutes", () => {
            const hours = 23;
            const hourString = hours.toString();
            expect(timeUtils.hhToMinutes(hourString)).to.equal(1380);
        });
    });
    describe("mmToMinutes", () => {
        it("should return hours in minutes", () => {
            const minutes = 23;
            const minuteString = minutes.toString();
            expect(timeUtils.mmToMinutes(minuteString)).to.equal(minutes);
        });
    });
    describe("hhmmToMinutes", () => {
        it("should return hours in minutes", () => {
            const hhmm = "01:40";
            expect(timeUtils.hhmmToMinutes(hhmm)).to.equal(100);
        });
    });
    describe("minutesToHh", () => {
        it("should return hh in minutes", () => {
            const minutes = 840;
            const expected = "14";
            expect(timeUtils.minutesToHh(minutes)).to.equal(expected);
        });
        it("should be of length 2 always", () => {
            const minutes = 100;
            expect(timeUtils.minutesToHh(minutes)).to.have.lengthOf(2);
        });
    });
    describe("minutesToMm", () => {
        it("should return mm in minutes", () => {
            const minutes = 100;
            const expected = "40";
            expect(timeUtils.minutesToMm(minutes)).to.equal(expected);
        });
        it("should be of length 2 always", () => {
            const minutes = 100;
            expect(timeUtils.minutesToHh(minutes)).to.have.lengthOf(2);
        });
    });
    describe("minutesToHhmm", () => {
        it("should return hours in minutes", () => {
            const minutes = 100;
            const expected = "01:40";
            expect(timeUtils.minutesToHhmm(minutes)).to.equal(expected);
        });
    });
    describe("hhmmStartEndToInterval", () => {
        it("should return object", () => {
            const start = "01:40";
            const end = "02:40";
            expect(typeof timeUtils.hhmmStartEndToInterval(start, end)).to.equal("object");
        });
        it("should deep equal", () => {
            const start = "01:40";
            const end = "02:40";
            const expected = {
                start: 100,
                end: 160,
            };
            expect(timeUtils.hhmmStartEndToInterval(start, end)).to.deep.equal(expected);
        });
    });
});
