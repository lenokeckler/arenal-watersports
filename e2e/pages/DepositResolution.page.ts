import type {
  Locator,
  Page,
  Response,
} from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { DEPOSIT_RESOLUTION_FORM_COPY as copy } from "@/app/features/reservations/deposit-resolution/constants/DepositResolutionFormCopy.constants";
import { PENDING_DEPOSITS_COPY } from "@/app/features/reservations/pending-deposits/constants/PendingDepositsCopy.constants";
import type { NullableRef } from "@/app/types";
import { resolveDepositResolutionPath } from "@/app/utils/reservations/resolveDepositResolutionPath";
import { getMainRegion } from "../support/mainRegion";

export const createDepositResolutionPage = (page: Page) => {
  const main = getMainRegion(page);
  const getSubmit = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, { name: copy.SUBMIT });

  return {
    choosePart: (): Promise<void> =>
      main
        .getByText(copy.CHOICE_PART, { exact: true })
        .click(),
    fillReason: (text: string): Promise<void> =>
      main.getByLabel(copy.REASON_LABEL).fill(text),
    fillReturned: (text: string): Promise<void> =>
      main.getByLabel(copy.RETURNED_LABEL).fill(text),
    getResolveLink: (code: string): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: PENDING_DEPOSITS_COPY.RESOLVE_LABEL(code),
      }),
    getStatus: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS),
    getSubmit,
    getText: (text: string): Locator =>
      main.getByText(text),
    goTo: (
      depositId: string
    ): Promise<NullableRef<Response>> =>
      page.goto(resolveDepositResolutionPath(depositId)),
    submit: (): Promise<void> => getSubmit().click(),
  };
};
