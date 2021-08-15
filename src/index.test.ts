import { describe, expect, it } from "@jest/globals";
import { MarshalError, parse } from "./index";

describe("parse", () => {
  it("parses a Uint8Array", () => {
    expect(parse(Uint8Array.from([4, 8, 105, 47]))).toBe(42);
  });
});

describe("Marshal.parse", () => {
  it("parses a Uint8Array", () => {
    expect(parse(Uint8Array.from([4, 8, 105, 47]))).toBe(42);
  });
});

describe("MarshalError", () => {
  it("should be an instance of Error", () => {
    expect(new MarshalError()).toBeInstanceOf(Error);
  });
});
