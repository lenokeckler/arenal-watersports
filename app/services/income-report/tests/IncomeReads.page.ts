import { vi } from "vitest";
import { fetchChargesInRange } from "@/app/services/income/fetchChargesInRange";
import { fetchRefundsInRange } from "@/app/services/income/fetchRefundsInRange";
import type { ChargeMovement } from "@/app/services/income/models/ChargeMovement.interface";
import type { Money } from "@/app/utils/money/models/Money.interface";

export class IncomeReadsPage {
  readonly charges = vi.mocked(fetchChargesInRange);
  readonly refunds = vi.mocked(fetchRefundsInRange);

  static returning(
    charges: ChargeMovement[],
    refunds: Money[]
  ): IncomeReadsPage {
    const page = new IncomeReadsPage();
    page.charges.mockResolvedValue(charges);
    page.refunds.mockResolvedValue(refunds);
    return page;
  }

  static chargesFailingWith(error: Error): IncomeReadsPage {
    const page = IncomeReadsPage.returning([], []);
    page.charges.mockRejectedValue(error);
    return page;
  }

  static refundsFailingWith(error: Error): IncomeReadsPage {
    const page = IncomeReadsPage.returning([], []);
    page.refunds.mockRejectedValue(error);
    return page;
  }
}
