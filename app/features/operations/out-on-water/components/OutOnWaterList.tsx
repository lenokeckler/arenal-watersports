"use client";

import UnorderedList from "@/app/components/list/UnorderedList";
import { useOutOnWaterClock } from "../hooks/useOutOnWaterClock";
import type { OutOnWaterListProps } from "../models/OutOnWaterListProps.interface";
import { OUT_ON_WATER_LIST_CLASS } from "../styles/OutOnWater.styles";
import OutOnWaterGroupCard from "./OutOnWaterGroupCard";
import type { JSX } from "react";

const OutOnWaterList = ({
  groups,
  initialNowIso,
}: OutOnWaterListProps): JSX.Element => {
  const now = useOutOnWaterClock(initialNowIso);

  return (
    <UnorderedList
      className={OUT_ON_WATER_LIST_CLASS}
      items={groups.map((group) => ({
        id: group.dispatchId,
        text: (
          <OutOnWaterGroupCard
            group={group}
            now={now}
          />
        ),
      }))}
    />
  );
};

export default OutOnWaterList;
