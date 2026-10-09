import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import FormSuccessNotice from "../FormSuccessNotice";
import {
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

  it("announces the message politely as a status", () => {
    render(<FormSuccessNotice message={NOTICE_MESSAGE} />);

    expect(
      createFormSuccessNoticePage().queryNotice()
    ).toHaveTextContent(NOTICE_MESSAGE);
  });
});
