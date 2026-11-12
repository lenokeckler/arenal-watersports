import { useEffect, useState } from "react";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { PASSWORD_RULES_ANNOUNCEMENT } from "../constants/PasswordRulesAnnouncement.constants";
import { resolvePasswordRulesSummary } from "../utils/resolvePasswordRulesSummary";

export const useDebouncedRulesSummary = (
  metCount: number,
  total: number
): string => {
  const [initialCount] = useState(metCount);
  const [announcedCount, setAnnouncedCount] =
    useState<NullableRef<number>>(null);
  const lastCount = announcedCount ?? initialCount;

  useEffect(() => {
    if (metCount === lastCount) {
      return undefined;
    }
    const timer = setTimeout(
      () => setAnnouncedCount(metCount),
      PASSWORD_RULES_ANNOUNCEMENT.DEBOUNCE_MS
    );
    return () => clearTimeout(timer);
  }, [metCount, lastCount]);

  return announcedCount === null
    ? STRING.Empty
    : resolvePasswordRulesSummary(announcedCount, total);
};
