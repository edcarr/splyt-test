import { expect } from "chai";
import utils from "../src/utils";

describe("utils", () => {
    describe("dummy", () => {
        it("should return true", () => {
            expect(utils.dummy()).to.be.true;
        });
    });
});
