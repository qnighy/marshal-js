import { describe, expect, it } from "@jest/globals";
import { loadMarshal } from "./index";

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
});
