import { expect } from "chai";
import { timeUtils } from "../../src/utils";

describe("timeUtils", () => {
    describe("parseHourString", () => {
        it("should return a number", () => {
            const hourString = "01";
            expect(typeof timeUtils.parseHourString(hourString)).to.equal("number");
        });
        it("should return hours in minutes", () => {
            const hours = 23;
            const hourString = hours.toString();
            expect(timeUtils.parseHourString(hourString)).to.equal(1380);
        });
    });
    describe("parseMinuteString", () => {
        it("should return hours in minutes", () => {
            const minutes = 23;
            const minuteString = minutes.toString();
            expect(timeUtils.parseMinuteString(minuteString)).to.equal(minutes);
        });
    });
    describe("parseHourMinuteStringToInteger", () => {
        it("should return hours in minutes", () => {
            const hhmm = "01:40";
            expect(timeUtils.parseHourMinuteStringToInteger(hhmm)).to.equal(100);
        });
    });
});
