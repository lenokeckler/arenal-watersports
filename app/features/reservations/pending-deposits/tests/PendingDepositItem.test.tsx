import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import { resolveDepositResolutionPath } from "@/app/utils/reservations/resolveDepositResolutionPath";
import PendingDepositItem from "../components/PendingDepositItem";
import { PENDING_DEPOSITS_COPY as COPY } from "../constants/PendingDepositsCopy.constants";
import { USD_DEPOSIT } from "./PendingDeposits.constants";

describe("PendingDepositItem", () => {
  it("links each pending deposit to its resolution", () => {
    render(<PendingDepositItem deposit={USD_DEPOSIT} />);

    const link = screen.getByRole(ARIA_ROLE.LINK, {
      name: COPY.RESOLVE_LABEL(
        USD_DEPOSIT.reservation.code
      ),
    });

    expect(link).toHaveAttribute(
      "href",
      resolveDepositResolutionPath(USD_DEPOSIT.id)
    );
    expect(link).toHaveTextContent(COPY.RESOLVE);
  });
});
