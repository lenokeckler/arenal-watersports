import type { Database } from "@/app/types";
import { STRING } from "@/app/constants";
import type { BoardUnitReceiveInput } from "../models/BoardUnitReceiveInput.interface";

type BoardUnitReturn =
  Database["public"]["Functions"]["receive_dispatch_unit"]["Args"]["p_return"];

export const buildBoardUnitReturn = (
  input: BoardUnitReceiveInput
): BoardUnitReturn => {
  const readings = {
    ...(input.fuelLevel === null
      ? {}
      : { fuel: input.fuelLevel }),
    ...(input.usageTotal === null
      ? {}
      : { usage: input.usageTotal }),
  };

  if (!input.hasDamage) {
    return { ...readings, impact_count: input.impactCount };
  }

  return {
    ...readings,
    damage: {
      ...(input.damageCause === null
        ? {}
        : { cause: input.damageCause }),
      ...(input.damageDescription.trim() === STRING.Empty
        ? {}
        : { description: input.damageDescription.trim() }),
      ...(input.detailLater ? { later: true } : {}),
      impact_delta: Math.max(
        input.impactCount - input.previousImpactCount,
        0
      ),
    },
    maintenance: true,
  };
};
