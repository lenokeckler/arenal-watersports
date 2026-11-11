import { describe, expect, it } from "vitest";
import { getCostaRicaTime } from "../utils/getCostaRicaTime";
import { COSTA_RICA_TIME_CASES } from "./ReservationEdit.constants";

describe("getCostaRicaTime", () => {
  it.each(COSTA_RICA_TIME_CASES)(
    "formats %s on the Costa Rica clock",
    (instant, time) => {
      expect(getCostaRicaTime(new Date(instant))).toBe(
        time
      );
    }
  );
});
