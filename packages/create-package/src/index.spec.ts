import { describe, it, expect } from "vitest";
import * as module from "./index.js";

describe("should export createPackage", () => {
  it("should test exports", () => {
    expect(module).toHaveProperty("createPackage");
  });
});
