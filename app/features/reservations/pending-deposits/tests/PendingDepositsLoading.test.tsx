import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import PendingDepositsLoading from "../components/PendingDepositsLoading";
import { PENDING_DEPOSITS_SKELETON_ROW_COUNT } from "../constants/PendingDeposits.constants";
import { PENDING_DEPOSITS_COPY } from "../constants/PendingDepositsCopy.constants";
import {
  ARIA_BUSY_ATTRIBUTE,
  ARIA_BUSY_VALUE,
} from "./PendingDeposits.constants";
import { createPendingDepositsPage } from "./PendingDeposits.page";

describe("PendingDepositsLoading", () => {
  it("renders the skeleton rows and announces the loading state", () => {
    render(<PendingDepositsLoading />);
    const page = createPendingDepositsPage();

    expect(page.getMain()).toHaveAttribute(
      ARIA_BUSY_ATTRIBUTE,
      ARIA_BUSY_VALUE
    );
    expect(page.getStatus()).toHaveTextContent(
      PENDING_DEPOSITS_COPY.LOADING_ANNOUNCEMENT
    );
    expect(page.getAllRows()).toHaveLength(
      PENDING_DEPOSITS_SKELETON_ROW_COUNT
    );
  });
});
