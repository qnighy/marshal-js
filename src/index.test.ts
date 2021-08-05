import { describe, expect, it } from "@jest/globals";
import { loadMarshal, MarshalError } from "./index";

describe("loadMarshal", () => {
  it("loads nil, false, and true", () => {
    const testCases: [unknown, number[]][] = [
      [null, [4, 8, 48]],
      [false, [4, 8, 70]],
      [true, [4, 8, 84]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads Fixnums", () => {
    const testCases: [unknown, number[]][] = [
      [0, [4, 8, 105, 0]],
      [1, [4, 8, 105, 6]],
      [2, [4, 8, 105, 7]],
      [3, [4, 8, 105, 8]],
      [4, [4, 8, 105, 9]],
      [-1, [4, 8, 105, 250]],
      [-2, [4, 8, 105, 249]],
      [-3, [4, 8, 105, 248]],
      [-4, [4, 8, 105, 247]],
      [-5, [4, 8, 105, 246]],
      [249, [4, 8, 105, 1, 249]],
      [250, [4, 8, 105, 1, 250]],
      [251, [4, 8, 105, 1, 251]],
      [252, [4, 8, 105, 1, 252]],
      [253, [4, 8, 105, 1, 253]],
      [254, [4, 8, 105, 1, 254]],
      [255, [4, 8, 105, 1, 255]],
      [256, [4, 8, 105, 2, 0, 1]],
      [257, [4, 8, 105, 2, 1, 1]],
      [258, [4, 8, 105, 2, 2, 1]],
      [259, [4, 8, 105, 2, 3, 1]],
      [260, [4, 8, 105, 2, 4, 1]],
      [-249, [4, 8, 105, 255, 7]],
      [-250, [4, 8, 105, 255, 6]],
      [-251, [4, 8, 105, 255, 5]],
      [-252, [4, 8, 105, 255, 4]],
      [-253, [4, 8, 105, 255, 3]],
      [-254, [4, 8, 105, 255, 2]],
      [-255, [4, 8, 105, 255, 1]],
      [-256, [4, 8, 105, 255, 0]],
      [-257, [4, 8, 105, 254, 255, 254]],
      [-258, [4, 8, 105, 254, 254, 254]],
      [-259, [4, 8, 105, 254, 253, 254]],
      [-260, [4, 8, 105, 254, 252, 254]],
      [12345, [4, 8, 105, 2, 57, 48]],
      [-12345, [4, 8, 105, 254, 199, 207]],
      [1234567, [4, 8, 105, 3, 135, 214, 18]],
      [-1234567, [4, 8, 105, 253, 121, 41, 237]],
      [123456789, [4, 8, 105, 4, 21, 205, 91, 7]],
      [-123456789, [4, 8, 105, 252, 235, 50, 164, 248]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads Bignums", () => {
    const testCases: [unknown, number[]][] = [
      [12345678901, [4, 8, 108, 43, 8, 53, 28, 220, 223, 2, 0]],
      [-12345678901, [4, 8, 108, 45, 8, 53, 28, 220, 223, 2, 0]],
      [1234567890123, [4, 8, 108, 43, 8, 203, 4, 251, 113, 31, 1]],
      [-1234567890123, [4, 8, 108, 45, 8, 203, 4, 251, 113, 31, 1]],
      [123456789012345, [4, 8, 108, 43, 8, 121, 223, 13, 134, 72, 112]],
      [-123456789012345, [4, 8, 108, 45, 8, 121, 223, 13, 134, 72, 112]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads Bignums", () => {
    const testCases: [unknown, number[]][] = [
      [12345678901, [4, 8, 108, 43, 8, 53, 28, 220, 223, 2, 0]],
      [-12345678901, [4, 8, 108, 45, 8, 53, 28, 220, 223, 2, 0]],
      [1234567890123, [4, 8, 108, 43, 8, 203, 4, 251, 113, 31, 1]],
      [-1234567890123, [4, 8, 108, 45, 8, 203, 4, 251, 113, 31, 1]],
      [123456789012345, [4, 8, 108, 43, 8, 121, 223, 13, 134, 72, 112]],
      [-123456789012345, [4, 8, 108, 45, 8, 121, 223, 13, 134, 72, 112]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads Floats", () => {
    const testCases: [unknown, number[]][] = [
      [0.0, [4, 8, 102, 6, 48]],
      [-0.0, [4, 8, 102, 7, 45, 48]],
      [1.0, [4, 8, 102, 6, 49]],
      [-1.0, [4, 8, 102, 7, 45, 49]],
      [3.14, [4, 8, 102, 9, 51, 46, 49, 52]],
      [123456789.0, [4, 8, 102, 14, 49, 50, 51, 52, 53, 54, 55, 56, 57]],
      [1.23e-25, [4, 8, 102, 13, 49, 46, 50, 51, 101, 45, 50, 53]],
      [Infinity, [4, 8, 102, 8, 105, 110, 102]],
      [-Infinity, [4, 8, 102, 9, 45, 105, 110, 102]],
      [NaN, [4, 8, 102, 8, 110, 97, 110]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads Strings", () => {
    const testCases: [unknown, number[]][] = [
      ["", [4, 8, 34, 0]],
      ["", [4, 8, 73, 34, 0, 6, 58, 6, 69, 84]],
      ["foo", [4, 8, 34, 8, 102, 111, 111]],
      ["foo", [4, 8, 73, 34, 8, 102, 111, 111, 6, 58, 6, 69, 84]],
      ["ほげ", [4, 8, 34, 11, 227, 129, 187, 227, 129, 146]],
      ["ほげ", [4, 8, 73, 34, 11, 227, 129, 187, 227, 129, 146, 6, 58, 6, 69, 84]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads Regexps", () => {
    const testCases: [unknown, number[]][] = [
      [new RegExp(""), [4, 8, 47, 0, 0]],
      [new RegExp(""), [4, 8, 73, 47, 0, 0, 6, 58, 6, 69, 70]],
      [/[a-z]/, [4, 8, 47, 10, 91, 97, 45, 122, 93, 0]],
      [/[a-z]/, [4, 8, 73, 47, 10, 91, 97, 45, 122, 93, 0, 6, 58, 6, 69, 70]],
      // [/[a-z]/i, [4, 8, 47, 10, 91, 97, 45, 122, 93, 1]],
      // [/[a-z]/i, [4, 8, 73, 47, 10, 91, 97, 45, 122, 93, 1, 6, 58, 6, 69, 70]],
      [/[ぁ-ん]/, [4, 8, 47, 14, 91, 227, 129, 129, 45, 227, 130, 147, 93, 16]],
      [/[ぁ-ん]/, [4, 8, 73, 47, 14, 91, 227, 129, 129, 45, 227, 130, 147, 93, 16, 6, 58, 6, 69, 84]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads Arrays", () => {
    const testCases: [unknown, number[]][] = [
      [[], [4, 8, 91, 0]],
      [[1], [4, 8, 91, 6, 105, 6]],
      [[100, 200, 300], [4, 8, 91, 8, 105, 105, 105, 1, 200, 105, 2, 44, 1]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads Hashes", () => {
    const testCases: [unknown, number[]][] = [
      [{}, [4, 8, 123, 0]],
      [{ 1: 2 }, [4, 8, 123, 6, 105, 6, 105, 7]],
      [{ 1: 2, 3: 4}, [4, 8, 123, 7, 105, 6, 105, 7, 105, 8, 105, 9]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads Hashes with defaults", () => {
    const testCases: [unknown, number[]][] = [
      [{ __ruby_default: 42, }, [4, 8, 125, 0, 105, 47]],
      [{ __ruby_default: 84, 1: 2 }, [4, 8, 125, 6, 105, 6, 105, 7, 105, 89]],
      [{ __ruby_default: 123, 1: 2, 3: 4 }, [4, 8, 125, 7, 105, 6, 105, 7, 105, 8, 105, 9, 105, 1, 123]]
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads symbols", () => {
    const testCases: [unknown, number[]][] = [
      ["a", [4, 8, 58, 6, 97]],
      ["@foobar", [4, 8, 58, 12, 64, 102, 111, 111, 98, 97, 114]],
      ["あ", [4, 8, 58, 8, 227, 129, 130]],
      ["あ", [4, 8, 73, 58, 8, 227, 129, 130, 6, 58, 6, 69, 84]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads symbol references", () => {
    const testCases: [unknown, number[]][] = [
      [["a", "b", "a", "b"], [4, 8, 91, 9, 58, 6, 97, 58, 6, 98, 59, 0, 59, 6]],
      [["a", "b", "b", "a"], [4, 8, 91, 9, 58, 6, 97, 58, 6, 98, 59, 6, 59, 0]],
      [["a", "a", "b", "b"], [4, 8, 91, 9, 58, 6, 97, 59, 0, 58, 6, 98, 59, 6]],
      [["foo", "E"], [4, 8, 91, 7, 73, 34, 8, 102, 111, 111, 6, 58, 6, 69, 84, 59, 0]],
      [["E", "foo"], [4, 8, 91, 7, 58, 6, 69, 73, 34, 8, 102, 111, 111, 6, 59, 0, 84]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads primitive objects with instance variables", () => {
    const testCases: [unknown, number[]][] = [
      [{ foo: "bar" }, [4, 8, 73, 123, 6, 58, 8, 102, 111, 111, 73, 34, 8, 98, 97, 114, 6, 58, 6, 69, 84, 6, 58, 9, 64, 98, 97, 122, 105, 47]],
      [[1, 2, 3], [4, 8, 73, 91, 8, 105, 6, 105, 7, 105, 8, 6, 58, 9, 64, 98, 97, 122, 105, 47]],
      [/[a-z]/, [4, 8, 73, 47, 10, 91, 97, 45, 122, 93, 0, 7, 58, 6, 69, 70, 58, 9, 64, 98, 97, 122, 105, 47]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads primitive subclass instances without instance variables", () => {
    const testCases: [unknown, number[]][] = [
      [{ foo: "bar" }, [4, 8, 67, 58, 45, 65, 99, 116, 105, 118, 101, 83, 117, 112, 112, 111, 114, 116, 58, 58, 72, 97, 115, 104, 87, 105, 116, 104, 73, 110, 100, 105, 102, 102, 101, 114, 101, 110, 116, 65, 99, 99, 101, 115, 115, 123, 6, 73, 34, 8, 102, 111, 111, 6, 58, 6, 69, 70, 73, 34, 8, 98, 97, 114, 6, 59, 6, 84]],
      ["production", [4, 8, 67, 58, 34, 65, 99, 116, 105, 118, 101, 83, 117, 112, 112, 111, 114, 116, 58, 58, 83, 116, 114, 105, 110, 103, 73, 110, 113, 117, 105, 114, 101, 114, 34, 15, 112, 114, 111, 100, 117, 99, 116, 105, 111, 110]],
      [["production", "development"], [4, 8, 67, 58, 33, 65, 99, 116, 105, 118, 101, 83, 117, 112, 112, 111, 114, 116, 58, 58, 65, 114, 114, 97, 121, 73, 110, 113, 117, 105, 114, 101, 114, 91, 7, 73, 34, 15, 112, 114, 111, 100, 117, 99, 116, 105, 111, 110, 6, 58, 6, 69, 84, 73, 34, 16, 100, 101, 118, 101, 108, 111, 112, 109, 101, 110, 116, 6, 59, 6, 84]],
      [/[a-z]/, [4, 8, 73, 67, 58, 16, 83, 117, 112, 101, 114, 82, 101, 103, 101, 120, 112, 47, 10, 91, 97, 45, 122, 93, 0, 6, 58, 6, 69, 70]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads primitive subclass instances with instance variables", () => {
    const testCases: [unknown, number[]][] = [
      [{ foo: "bar" }, [4, 8, 73, 67, 58, 45, 65, 99, 116, 105, 118, 101, 83, 117, 112, 112, 111, 114, 116, 58, 58, 72, 97, 115, 104, 87, 105, 116, 104, 73, 110, 100, 105, 102, 102, 101, 114, 101, 110, 116, 65, 99, 99, 101, 115, 115, 123, 6, 73, 34, 8, 102, 111, 111, 6, 58, 6, 69, 70, 73, 34, 8, 98, 97, 114, 6, 59, 6, 84, 6, 58, 9, 64, 98, 97, 122, 105, 47]],
      ["production", [4, 8, 73, 67, 58, 34, 65, 99, 116, 105, 118, 101, 83, 117, 112, 112, 111, 114, 116, 58, 58, 83, 116, 114, 105, 110, 103, 73, 110, 113, 117, 105, 114, 101, 114, 34, 15, 112, 114, 111, 100, 117, 99, 116, 105, 111, 110, 6, 58, 6, 69, 84]],
      [["production", "development"], [4, 8, 73, 67, 58, 33, 65, 99, 116, 105, 118, 101, 83, 117, 112, 112, 111, 114, 116, 58, 58, 65, 114, 114, 97, 121, 73, 110, 113, 117, 105, 114, 101, 114, 91, 7, 73, 34, 15, 112, 114, 111, 100, 117, 99, 116, 105, 111, 110, 6, 58, 6, 69, 84, 73, 34, 16, 100, 101, 118, 101, 108, 111, 112, 109, 101, 110, 116, 6, 59, 6, 84, 6, 58, 9, 64, 98, 97, 122, 105, 47]],
      [/[a-z]/, [4, 8, 73, 67, 58, 16, 83, 117, 112, 101, 114, 82, 101, 103, 101, 120, 112, 47, 10, 91, 97, 45, 122, 93, 0, 7, 58, 6, 69, 70, 58, 9, 64, 98, 97, 122, 105, 47]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads primitive objects as empty hashes", () => {
    const testCases: [unknown, number[]][] = [
      [{}, [4, 8, 111, 58, 33, 65, 99, 116, 105, 111, 110, 67, 111, 110, 116, 114, 111, 108, 108, 101, 114, 58, 58, 80, 97, 114, 97, 109, 101, 116, 101, 114, 115, 7, 58, 16, 64, 112, 97, 114, 97, 109, 101, 116, 101, 114, 115, 67, 58, 45, 65, 99, 116, 105, 118, 101, 83, 117, 112, 112, 111, 114, 116, 58, 58, 72, 97, 115, 104, 87, 105, 116, 104, 73, 110, 100, 105, 102, 102, 101, 114, 101, 110, 116, 65, 99, 99, 101, 115, 115, 123, 6, 73, 34, 8, 102, 111, 111, 6, 58, 6, 69, 70, 73, 34, 8, 98, 97, 114, 6, 59, 8, 84, 58, 15, 64, 112, 101, 114, 109, 105, 116, 116, 101, 100, 70]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads user-defined objects (marshal_load) as empty hashes", () => {
    const testCases: [unknown, number[]][] = [
      [{}, [4, 8, 85, 58, 17, 71, 101, 109, 58, 58, 86, 101, 114, 115, 105, 111, 110, 91, 6, 73, 34, 10, 49, 46, 50, 46, 51, 6, 58, 6, 69, 84]],
      [{}, [4, 8, 85, 58, 9, 68, 97, 116, 101, 91, 11, 105, 0, 105, 0, 105, 0, 105, 0, 105, 0, 102, 12, 50, 50, 57, 57, 49, 54, 49]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads user-defined objects (_load) as empty hashes", () => {
    const testCases: [unknown, number[]][] = [
      [{}, [4, 8, 73, 117, 58, 13, 69, 110, 99, 111, 100, 105, 110, 103, 10, 85, 84, 70, 45, 56, 6, 58, 6, 69, 70]],
      [{}, [4, 8, 117, 58, 23, 71, 101, 109, 58, 58, 83, 112, 101, 99, 105, 102, 105, 99, 97, 116, 105, 111, 110, 1, 166, 4, 8, 91, 24, 73, 34, 10, 51, 46, 49, 46, 54, 6, 58, 6, 69, 84, 105, 9, 73, 34, 10, 49, 46, 50, 46, 51, 6, 59, 0, 84, 48, 73, 117, 58, 9, 84, 105, 109, 101, 13, 160, 92, 30, 192, 0, 0, 0, 0, 6, 58, 9, 122, 111, 110, 101, 73, 34, 8, 85, 84, 67, 6, 59, 0, 70, 48, 85, 58, 21, 71, 101, 109, 58, 58, 82, 101, 113, 117, 105, 114, 101, 109, 101, 110, 116, 91, 6, 91, 6, 91, 7, 73, 34, 7, 62, 61, 6, 59, 0, 84, 85, 58, 17, 71, 101, 109, 58, 58, 86, 101, 114, 115, 105, 111, 110, 91, 6, 73, 34, 6, 48, 6, 59, 0, 70, 85, 59, 8, 91, 6, 91, 6, 64, 13, 48, 91, 0, 73, 34, 0, 6, 59, 0, 84, 48, 91, 0, 48, 48, 84, 73, 34, 9, 114, 117, 98, 121, 6, 59, 0, 84, 91, 0, 123, 0]],
      [{}, [4, 8, 117, 58, 15, 66, 105, 103, 68, 101, 99, 105, 109, 97, 108, 31, 50, 55, 58, 48, 46, 49, 50, 51, 52, 53, 54, 55, 56, 57, 49, 50, 51, 52, 53, 54, 55, 56, 57, 101, 49, 56]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads struct instances as objects", () => {
    const testCases: [unknown, number[]][] = [
      [{ index: 0, line: 1, column: 1 }, [4, 8, 83, 58, 24, 80, 115, 121, 99, 104, 58, 58, 80, 97, 114, 115, 101, 114, 58, 58, 77, 97, 114, 107, 8, 58, 10, 105, 110, 100, 101, 120, 105, 0, 58, 9, 108, 105, 110, 101, 105, 6, 58, 11, 99, 111, 108, 117, 109, 110, 105, 6]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads classes and modules as empty objects", () => {
    const testCases: [unknown, number[]][] = [
      [{}, [4, 8, 77, 11, 79, 98, 106, 101, 99, 116]],
      [{}, [4, 8, 77, 11, 75, 101, 114, 110, 101, 108]],
      [{}, [4, 8, 99, 11, 79, 98, 106, 101, 99, 116]],
      [{}, [4, 8, 109, 11, 75, 101, 114, 110, 101, 108]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  });

  it("loads common objects", () => {
    const testCases: [unknown, number[]][] = [
      [[[42], [42], [42], [42]], [4, 8, 91, 9, 91, 6, 105, 47, 91, 6, 105, 47, 64, 6, 64, 7]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);

    const tc1 = results[0][0] as [[42], [42], [42], [42]];
    expect(tc1[0]).toBe(tc1[2]);
    expect(tc1[1]).toBe(tc1[3]);
    expect(tc1[0]).not.toBe(tc1[1]);
  });

  it("loads cyclic references (1)", () => {
    const obj = loadMarshal(Buffer.from([4, 8, 91, 6, 64, 0]));
    if (!Array.isArray(obj)) throw new Error("Not an array");
    expect(obj.length).toBe(1);
    expect(obj[0]).toBe(obj);
  });

  it("loads cyclic references (2)", () => {
    const obj = loadMarshal(Buffer.from([4, 8, 91, 6, 91, 6, 64, 0]));
    if (!Array.isArray(obj)) throw new Error("Not an array");
    expect(obj.length).toBe(1);
    const obj2 = obj[0];
    if (!Array.isArray(obj2)) throw new Error("Not an array");
    expect(obj2.length).toBe(1);
    expect(obj2[0]).toBe(obj);

    expect(obj).not.toBe(obj2);
  });

  it("loads cyclic references (3)", () => {
    const obj = loadMarshal(Buffer.from([4, 8, 91, 6, 91, 6, 64, 6]));
    if (!Array.isArray(obj)) throw new Error("Not an array");
    expect(obj.length).toBe(1);
    const obj2 = obj[0];
    if (!Array.isArray(obj2)) throw new Error("Not an array");
    expect(obj2.length).toBe(1);
    expect(obj2[0]).toBe(obj2);

    expect(obj).not.toBe(obj2);
  });

  it("fails on EOF", () => {
    const testCases: [number[], string][] = [
      [[], "Marshal error: unexpected EOF"],
      [[4], "Marshal error: unexpected EOF"],
      [[4, 8], "Marshal error: unexpected EOF"],
      [[4, 8, 105], "Marshal error: unexpected EOF"],
      [[4, 8, 105, 1], "Marshal error: unexpected EOF"],
      [[4, 8, 105, 2, 0], "Marshal error: unexpected EOF"],
    ];
    const results = testCases.map(([input]) => {
      try {
        loadMarshal(Buffer.from(input));
        return [input, "--SUCCESS--"];
      } catch(err) {
        if (err instanceof MarshalError) {
          return [input, err.message];
        }
        throw err;
      }
    });
    expect(results).toEqual(testCases);
  })

  it("loads compatible versions", () => {
    const testCases: [unknown, number[]][] = [
      [null, [4, 7, 48]],
      [false, [4, 6, 70]],
      [true, [4, 5, 84]],
    ];
    const results = testCases.map(([, input]) => [loadMarshal(Buffer.from(input)), input]);
    expect(results).toEqual(testCases);
  })

  it("fails on incompatible versions", () => {
    const testCases: [number[], string][] = [
      [[4, 9, 48], "Marshal error: unexpected version: 4.9"],
      [[5, 8, 48], "Marshal error: unexpected version: 5.8"],
      [[3, 8, 48], "Marshal error: unexpected version: 3.8"],
    ];
    const results = testCases.map(([input]) => {
      try {
        loadMarshal(Buffer.from(input));
        return [input, "--SUCCESS--"];
      } catch(err) {
        if (err instanceof MarshalError) {
          return [input, err.message];
        }
        throw err;
      }
    });
    expect(results).toEqual(testCases);
  })
});
