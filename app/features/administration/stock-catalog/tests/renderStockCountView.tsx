import { render } from "@testing-library/react";
import type { StockCountViewProps } from "../models/StockCountViewProps.interface";
import StockCountView from "../StockCountView";
import { buildStockCountViewProps } from "./StockCount.constants";
import { createStockCountPage } from "./StockCount.page";

export const renderStockCountView = (
  overrides: Partial<StockCountViewProps> = {}
) => {
  render(
    <StockCountView
      {...buildStockCountViewProps(overrides)}
    />
  );
  return createStockCountPage();
};
