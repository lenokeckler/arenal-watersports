import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProfileEmailPage, {
  metadata,
} from "@/app/(system)/profile/email/page";
import { PERSONAL_EMAIL_FORM_METADATA } from "../constants/PersonalEmailFormMetadata.constants";
import { ENTRY_TEST_ID } from "./personalEmailFormView.constants";

vi.mock("../PersonalEmailForm", () => ({
  default: () => <div data-testid={ENTRY_TEST_ID} />,
}));

describe("ProfileEmailPage", () => {
  it("titles the page with the personal email metadata", () => {
    expect(metadata).toBe(PERSONAL_EMAIL_FORM_METADATA);
  });

  it("renders the personal email entry", () => {
    render(<ProfileEmailPage />);

    expect(
      screen.getByTestId(ENTRY_TEST_ID)
    ).toBeInTheDocument();
  });
});
