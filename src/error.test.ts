import { describe, expect, it } from "@jest/globals";
import { MarshalError } from "./error";

describe("MarshalError", () => {
  it("should be an instance of Error", () => {
    expect(new MarshalError()).toBeInstanceOf(Error);
  });
  it("should have a message", () => {
    expect(new MarshalError().message).toBe("Marshal error: ");
    expect(new MarshalError("marshal data too short").message).toBe(
      "Marshal error: marshal data too short"
    );
  });
});
