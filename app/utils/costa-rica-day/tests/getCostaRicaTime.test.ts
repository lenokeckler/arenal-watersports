import { describe, expect, it } from "vitest";
import { getCostaRicaTime } from "../getCostaRicaTime";
import { TIME_CASES } from "./getCostaRicaTime.constants";

describe("getCostaRicaTime", () => {
  it.each(TIME_CASES)(
    "formats the %s in Costa Rica as HH:MM",
    (_name, instant, expected) => {
      expect(getCostaRicaTime(instant)).toBe(expected);
    }
  );
});
