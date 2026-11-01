import { render } from "@testing-library/react";
import type { UnitListViewProps } from "../models/UnitListViewProps.interface";
import UnitListView from "../UnitListView";
import { buildUnitListViewProps } from "./UnitListViewProps.constants";

export const renderUnitListView = (
  overrides: Partial<UnitListViewProps> = {}
): void => {
  render(
    <UnitListView {...buildUnitListViewProps(overrides)} />
  );
};
