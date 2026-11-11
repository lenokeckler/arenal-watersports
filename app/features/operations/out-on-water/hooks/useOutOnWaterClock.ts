"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OUT_ON_WATER_TIME } from "../constants/OutOnWater.constants";

export const useOutOnWaterClock = (
  initialNowIso: string
): Date => {
  const router = useRouter();
  const [now, setNow] = useState(
    () => new Date(initialNowIso)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
      router.refresh();
    }, OUT_ON_WATER_TIME.REFRESH_MS);

    return () => clearInterval(intervalId);
  }, [router]);

  return now;
};
