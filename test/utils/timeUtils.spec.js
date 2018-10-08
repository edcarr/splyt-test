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
});
