import "./tariffList.harness";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTariffListViewModel } from "../hooks/useTariffListViewModel";
import { buildTariffCardViewModel } from "../utils/buildTariffCardViewModel";
import { DEFAULT_CATALOG_ROW } from "./TariffCatalog.constants";

describe("useTariffListViewModel", () => {
  it("builds a card per category", () => {
    const { result } = renderHook(() =>
      useTariffListViewModel({
        categories: [DEFAULT_CATALOG_ROW],
      })
    );

    expect(result.current.cards).toEqual([
      buildTariffCardViewModel(DEFAULT_CATALOG_ROW),
    ]);
  });
});
