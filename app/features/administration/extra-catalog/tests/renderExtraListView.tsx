import { render } from "@testing-library/react";
import ExtraListView from "../ExtraListView";
import type { ExtraListViewProps } from "../models/ExtraListViewProps.interface";
import { buildExtraListViewProps } from "./ExtraList.constants";

export const renderExtraListView = (
  overrides: Partial<ExtraListViewProps> = {}
): void => {
  render(
    <ExtraListView
      {...buildExtraListViewProps(overrides)}
    />
  );
};
