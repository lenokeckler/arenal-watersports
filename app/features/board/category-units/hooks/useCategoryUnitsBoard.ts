"use client";

import { useState } from "react";
import type { NullableRef } from "@/app/types";
import type { CategoryUnitsBoardViewModel } from "../models/CategoryUnitsBoardViewModel.interface";

interface CategoryUnitsBoardInput {
  onEditingChange: () => void;
}

export const useCategoryUnitsBoard = ({
  onEditingChange,
}: CategoryUnitsBoardInput): CategoryUnitsBoardViewModel => {
  const [isEditing, setIsEditing] = useState(false);
  const [infoUnitId, setInfoUnitId] =
    useState<NullableRef<string>>(null);
  const [modifyUnitId, setModifyUnitId] =
    useState<NullableRef<string>>(null);
  const [receiveUnitId, setReceiveUnitId] =
    useState<NullableRef<string>>(null);

  return {
    handleCloseInfo: () => setInfoUnitId(null),
    handleCloseModify: () => setModifyUnitId(null),
    handleCloseReceive: () => setReceiveUnitId(null),
    handleOpenInfo: setInfoUnitId,
    handleOpenModify: setModifyUnitId,
    handleOpenReceive: (unitId) => {
      setInfoUnitId(null);
      setReceiveUnitId(unitId);
    },
    handleToggleEditing: () => {
      setIsEditing((current) => !current);
      onEditingChange();
    },
    infoUnitId,
    isEditing,
    modifyUnitId,
    receiveUnitId,
  };
};
