/**
 * Unit tests for CAML URL safety guards.
 */
import { describe, it, expect } from "vitest";
import { isSafeHref, isExternalHref } from "../src/safeHref";

describe("isSafeHref", () => {
  it("should allow https URLs", () => {
    expect(isSafeHref("https://example.com")).toBe(true);
    expect(isSafeHref("https://docs.example.com/path")).toBe(true);
  });

  it("should allow http URLs", () => {
    expect(isSafeHref("http://example.com")).toBe(true);
  });

  it("should allow relative URLs", () => {
    expect(isSafeHref("/documents")).toBe(true);
    expect(isSafeHref("/c/user/corpus")).toBe(true);
  });

  it("should allow fragment URLs", () => {
    expect(isSafeHref("#section")).toBe(true);
    expect(isSafeHref("#")).toBe(true);
  });

  it("should reject javascript: URLs", () => {
    expect(isSafeHref("javascript:alert(1)")).toBe(false);
    expect(isSafeHref("JavaScript:void(0)")).toBe(false);
  });

  it("should reject data: URLs", () => {
    expect(isSafeHref("data:text/html,<h1>test</h1>")).toBe(false);
  });

  it("should reject vbscript: URLs", () => {
    expect(isSafeHref("vbscript:MsgBox")).toBe(false);
  });

  it("should reject empty and falsy inputs", () => {
    expect(isSafeHref("")).toBe(false);
  });

  it("should trim whitespace before checking", () => {
    expect(isSafeHref("  https://example.com  ")).toBe(true);
    expect(isSafeHref("  javascript:alert(1)  ")).toBe(false);
  });
});

describe("isExternalHref", () => {
  it("should return true for http/https URLs", () => {
    expect(isExternalHref("http://example.com")).toBe(true);
    expect(isExternalHref("https://example.com")).toBe(true);
  });

  it("should return false for relative URLs", () => {
    expect(isExternalHref("/documents")).toBe(false);
    expect(isExternalHref("#section")).toBe(false);
  });
});
