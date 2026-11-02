import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import FormSuccessNotice from "../FormSuccessNotice";
import {
  BLANK_MESSAGE,
  ARIA_HIDDEN_ATTRIBUTE,
  ARIA_HIDDEN_VALUE,
  EMPTY_MESSAGE,
  NOTICE_MESSAGE,
} from "./FormSuccessNotice.constants";
import { createFormSuccessNoticePage } from "./FormSuccessNotice.page";

describe("FormSuccessNotice", () => {
  it("renders nothing when there is no message", () => {
    render(<FormSuccessNotice message={null} />);

    expect(
      createFormSuccessNoticePage().queryNotice()
    ).not.toBeInTheDocument();
  });

  it("renders nothing for an empty message", () => {
    render(<FormSuccessNotice message={EMPTY_MESSAGE} />);

    expect(
      createFormSuccessNoticePage().queryNotice()
    ).not.toBeInTheDocument();
  });

  it("renders nothing for a blank message", () => {
    render(<FormSuccessNotice message={BLANK_MESSAGE} />);

    expect(
      createFormSuccessNoticePage().queryNotice()
    ).not.toBeInTheDocument();
  });

  it("announces the message politely as a status", () => {
    render(<FormSuccessNotice message={NOTICE_MESSAGE} />);

    expect(
      createFormSuccessNoticePage().queryNotice()
    ).toHaveTextContent(NOTICE_MESSAGE);
  });

  it("hides the decorative icon from assistive technology", () => {
    render(<FormSuccessNotice message={NOTICE_MESSAGE} />);

    expect(
      createFormSuccessNoticePage().getIcon()
    ).toHaveAttribute(
      ARIA_HIDDEN_ATTRIBUTE,
      ARIA_HIDDEN_VALUE
    );
  });

  it("does not move focus when it appears", () => {
    const { rerender } = render(
      <FormSuccessNotice message={null} />
    );
    const focusedBefore = document.activeElement;

    rerender(
      <FormSuccessNotice message={NOTICE_MESSAGE} />
    );

    expect(document.activeElement).toBe(focusedBefore);
  });
});
