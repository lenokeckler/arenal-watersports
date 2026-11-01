import { describe, expect, it } from "vitest";
import { resolveQueryChoice } from "../resolveQueryChoice";
import {
  CHOICES,
  PROTOTYPE_KEYS,
} from "./resolveQueryChoice.constants";

describe("resolveQueryChoice prototype keys", () => {
  it.each(PROTOTYPE_KEYS)(
    "returns null for the inherited key %s",
    (key) => {
      expect(resolveQueryChoice(key, CHOICES)).toBeNull();
    }
  );
});
