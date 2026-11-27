import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import PriceLookup from "../PriceLookup";
import { PRICE_LOOKUP_COPY } from "../constants/PriceLookupCopy.constants";
import { getPriceLookupCatalog } from "../services/getPriceLookupCatalog";
import { FULL_CATALOG } from "./PriceLookup.constants";
import { createPriceLookupPage } from "./PriceLookup.page";

vi.mock("../services/getPriceLookupCatalog", () => ({
  getPriceLookupCatalog: vi.fn(),
}));

const page = createPriceLookupPage();

const renderEntry = async (): Promise<void> => {
  render(await PriceLookup());
};

describe("PriceLookup", () => {
  beforeEach(() => {
    vi.mocked(getPriceLookupCatalog).mockReset();
  });

  it("shows the prices read for the operations area", async () => {
    vi.mocked(getPriceLookupCatalog).mockResolvedValue(
      FULL_CATALOG
    );

    await renderEntry();

    expect(
      page.getRegion(PRICE_LOOKUP_COPY.TARIFFS_HEADING)
    ).toBeInTheDocument();
    expect(page.queryAlert()).toBeNull();
  });

  it("tells a worker without the operations area that access is denied", async () => {
    vi.mocked(getPriceLookupCatalog).mockRejectedValue(
      new OperationsAccessError()
    );

    await renderEntry();

    expect(page.queryAlert()).toHaveTextContent(
      PRICE_LOOKUP_COPY.FORBIDDEN
    );
  });

  it("asks to check the signal when the read fails", async () => {
    vi.mocked(getPriceLookupCatalog).mockRejectedValue(
      new Error("offline")
    );

    await renderEntry();

    expect(page.queryAlert()).toHaveTextContent(
      PRICE_LOOKUP_COPY.ERROR
    );
  });
});
