"use client";

import type { NullableRef } from "@/app/types";
import CategoryUnitsConnectionNotice from "./components/CategoryUnitsConnectionNotice";
import { useCategoryUnitsRealtimeViewModel } from "./hooks/useCategoryUnitsRealtimeViewModel";

const CategoryUnitsRealtime =
  (): NullableRef<React.JSX.Element> => {
    const { hasConnectionError } =
      useCategoryUnitsRealtimeViewModel();

    return hasConnectionError ? (
      <CategoryUnitsConnectionNotice />
    ) : null;
  };

export default CategoryUnitsRealtime;
