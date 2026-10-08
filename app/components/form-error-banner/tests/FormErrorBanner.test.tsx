import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import FormErrorBanner from "../FormErrorBanner";
import { BANNER_MESSAGE } from "./FormErrorBanner.constants";
import { createFormErrorBannerPage } from "./FormErrorBanner.page";

describe("FormErrorBanner", () => {
  it("renders nothing when there is no message", () => {
    render(<FormErrorBanner message={null} />);

    expect(
      createFormErrorBannerPage().queryBanner()
    ).not.toBeInTheDocument();
  });

  it("announces the message as an alert", () => {
    render(<FormErrorBanner message={BANNER_MESSAGE} />);

    expect(
      createFormErrorBannerPage().queryBanner()
    ).toHaveTextContent(BANNER_MESSAGE);
  });
});
