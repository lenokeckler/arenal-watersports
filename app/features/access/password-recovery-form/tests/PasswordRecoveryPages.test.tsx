import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PasswordRecoveryPage, {
  metadata as requestMetadata,
} from "@/app/access/recovery/page";
import PasswordRecoveryResetPage, {
  metadata as resetMetadata,
} from "@/app/access/recovery/reset/page";
import {
  PASSWORD_RECOVERY_USERNAME_QUERY_PARAM,
  STRING,
} from "@/app/constants";
import { PASSWORD_RECOVERY_REQUEST_METADATA } from "../constants/PasswordRecoveryRequestMetadata.constants";
import { PASSWORD_RECOVERY_RESET_METADATA } from "../constants/PasswordRecoveryResetMetadata.constants";
import type { PasswordRecoveryResetFormProps } from "../models/PasswordRecoveryResetFormProps.interface";
import {
  ACCEPTED_USERNAME,
  MARKUP_LIKE_USERNAME,
  TOO_LONG_USERNAME,
  TOO_SHORT_USERNAME,
} from "./passwordRecoveryPrefill.constants";
import {
  ENTRY_TEST_ID,
  PREFILL_ATTRIBUTE,
  SCRIPT_SELECTOR,
} from "./passwordRecoveryView.constants";

vi.mock("../PasswordRecoveryRequestForm", () => ({
  default: () => <div data-testid={ENTRY_TEST_ID} />,
}));

vi.mock("../PasswordRecoveryResetForm", () => ({
  default: ({
    initialUsername,
  }: PasswordRecoveryResetFormProps) => (
    <div
      data-testid={ENTRY_TEST_ID}
      data-username={initialUsername}
    />
  ),
}));

const renderResetPage = async (
  username: string | undefined
) =>
  render(
    await PasswordRecoveryResetPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({
        [PASSWORD_RECOVERY_USERNAME_QUERY_PARAM]: username,
      }),
    })
  );

describe("recovery pages", () => {
  it("titles each page with its metadata", () => {
    expect(requestMetadata).toBe(
      PASSWORD_RECOVERY_REQUEST_METADATA
    );
    expect(resetMetadata).toBe(
      PASSWORD_RECOVERY_RESET_METADATA
    );
  });

  it("renders the request entry", () => {
    render(<PasswordRecoveryPage />);

    expect(
      screen.getByTestId(ENTRY_TEST_ID)
    ).toBeInTheDocument();
  });

  it("hands an accepted username to the reset entry", async () => {
    await renderResetPage(ACCEPTED_USERNAME);

    expect(
      screen.getByTestId(ENTRY_TEST_ID)
    ).toHaveAttribute(PREFILL_ATTRIBUTE, ACCEPTED_USERNAME);
  });

  it.each([
    TOO_SHORT_USERNAME,
    TOO_LONG_USERNAME,
    undefined,
  ])(
    "hands an empty prefill to the reset entry for %j",
    async (username) => {
      await renderResetPage(username);

      expect(
        screen.getByTestId(ENTRY_TEST_ID)
      ).toHaveAttribute(PREFILL_ATTRIBUTE, STRING.Empty);
    }
  );

  it("passes markup-like text as plain text, never as markup", async () => {
    const { container } = await renderResetPage(
      MARKUP_LIKE_USERNAME
    );

    expect(
      container.querySelector(SCRIPT_SELECTOR)
    ).toBeNull();
    expect(
      screen.getByTestId(ENTRY_TEST_ID)
    ).toHaveAttribute(
      PREFILL_ATTRIBUTE,
      MARKUP_LIKE_USERNAME
    );
  });
});
