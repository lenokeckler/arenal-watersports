import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import DepositSkeletonSummary from "../DepositSkeletonSummary";
import { createDepositLedgerPage } from "./DepositLedger.page";

describe("DepositSkeletonSummary", () => {
  it("renders no text", () => {
    const { container } = render(
      <DepositSkeletonSummary />
    );
    const page = createDepositLedgerPage();

    expect(page.getTextContent(container)).toBe("");
  });
});
