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

  return {
    handleCloseInfo: () => setInfoUnitId(null),
    handleCloseModify: () => setModifyUnitId(null),
    handleOpenInfo: setInfoUnitId,
    handleOpenModify: setModifyUnitId,
    handleToggleEditing: () => {
      setIsEditing((current) => !current);
      onEditingChange();
    },
    infoUnitId,
    isEditing,
    modifyUnitId,
  };
};
