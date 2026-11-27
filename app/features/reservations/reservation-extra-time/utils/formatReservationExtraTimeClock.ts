import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { getCostaRicaTime } from "@/app/utils/costa-rica-day/getCostaRicaTime";

export const formatReservationExtraTimeClock = (
  instant: NullableRef<string>
): string =>
  instant === null
    ? STRING.DASH
    : getCostaRicaTime(new Date(instant));
