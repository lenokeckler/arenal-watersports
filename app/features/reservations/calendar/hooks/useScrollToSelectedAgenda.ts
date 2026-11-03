import { useEffect } from "react";
import { DOCUMENT } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";

export const useScrollToSelectedAgenda = (
  agendaId: NullableUndefined<string>
): void => {
  useEffect(() => {
    if (agendaId === undefined) {
      return;
    }
    document.getElementById(agendaId)?.scrollIntoView({
      behavior: DOCUMENT.SMOOTH,
      block: "start",
    });
  }, [agendaId]);
};
