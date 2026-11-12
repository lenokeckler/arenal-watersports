"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Text } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { ARIA_ROLE, BUTTON_TYPES } from "@/app/constants";
import {
  INVENTORY_UNIT_CONDITION_ACTION_LABEL,
  INVENTORY_UNIT_CONDITION_MESSAGE,
  INVENTORY_UNIT_CONDITION_RESULT,
  INVENTORY_UNIT_CONDITION_STATUSES,
  type InventoryUnitConditionResult,
} from "../constants/InventoryUnitCondition.constants";
import { submitInventoryUnitCondition } from "../actions/submitInventoryUnitCondition";
import type { InventoryUnitConditionControlProps } from "../models/InventoryUnitConditionControlProps.interface";
import {
  INVENTORY_UNIT_CONDITION_ACTIONS_CLASS,
  INVENTORY_UNIT_CONDITION_BUTTON_CLASS,
  INVENTORY_UNIT_CONDITION_MESSAGE_CLASS,
} from "../styles/InventoryCategory.styles";
import { isInventoryUnitConditionStatus } from "../utils/isInventoryUnitConditionStatus";

const InventoryUnitConditionControl = ({
  status,
  unitId,
}: InventoryUnitConditionControlProps): React.JSX.Element | null => {
  const router = useRouter();
  const [result, setResult] =
    useState<InventoryUnitConditionResult>();
  const [isPending, startTransition] = useTransition();

  if (!isInventoryUnitConditionStatus(status)) {
    return null;
  }

  const change = (nextStatus: string): void => {
    startTransition(async () => {
      try {
        const outcome = await submitInventoryUnitCondition(
          unitId,
          nextStatus
        );
        setResult(outcome);

        if (
          outcome ===
          INVENTORY_UNIT_CONDITION_RESULT.CHANGED
        ) {
          router.refresh();
        }
      } catch {
        setResult(INVENTORY_UNIT_CONDITION_RESULT.FAILED);
      }
    });
  };

  return (
    <>
      <div
        className={INVENTORY_UNIT_CONDITION_ACTIONS_CLASS}
      >
        {INVENTORY_UNIT_CONDITION_STATUSES.filter(
          (nextStatus) => nextStatus !== status
        ).map((nextStatus) => (
          <Button
            key={nextStatus}
            type={BUTTON_TYPES.BUTTON}
            variant={BUTTON.BASE}
            aria-disabled={isPending}
            className={
              INVENTORY_UNIT_CONDITION_BUTTON_CLASS
            }
            onClick={() => change(nextStatus)}
          >
            {
              INVENTORY_UNIT_CONDITION_ACTION_LABEL[
                nextStatus
              ]
            }
          </Button>
        ))}
      </div>
      {result && (
        <Text
          role={
            result ===
            INVENTORY_UNIT_CONDITION_RESULT.CHANGED
              ? ARIA_ROLE.STATUS
              : ARIA_ROLE.ALERT
          }
          className={INVENTORY_UNIT_CONDITION_MESSAGE_CLASS}
        >
          {INVENTORY_UNIT_CONDITION_MESSAGE[result]}
        </Text>
      )}
    </>
  );
};

export default InventoryUnitConditionControl;
