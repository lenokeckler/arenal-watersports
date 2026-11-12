import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LOADING_COPY } from "@/app/constants/strings/LoadingCopy.constants";
import Button from "../Button";
import {
  BUTTON_CHILDREN_TEXT,
  BUTTON_LOADING_TEXT,
} from "./Button.constants";
import { createButtonPage } from "./Button.page";

describe("Button", () => {
  it("renders children when isLoading is false", () => {
    render(<Button>{BUTTON_CHILDREN_TEXT}</Button>);
    const buttonPage = createButtonPage();

    expect(buttonPage.getButton()).toHaveTextContent(
      BUTTON_CHILDREN_TEXT
    );
  });

  it("renders loadingText instead of children when isLoading is true and loadingText is provided", () => {
    render(
      <Button
        isLoading
        loadingText={BUTTON_LOADING_TEXT}
      >
        {BUTTON_CHILDREN_TEXT}
      </Button>
    );
    const buttonPage = createButtonPage();

    expect(buttonPage.getButton()).toHaveTextContent(
      BUTTON_LOADING_TEXT
    );
  });

  it("falls back to the default loading copy when isLoading is true and loadingText is not provided", () => {
    render(
      <Button isLoading>{BUTTON_CHILDREN_TEXT}</Button>
    );
    const buttonPage = createButtonPage();

    expect(buttonPage.getButton()).toHaveTextContent(
      LOADING_COPY.TEXT
    );
  });

  it("disables the button when isLoading is true", () => {
    render(
      <Button isLoading>{BUTTON_CHILDREN_TEXT}</Button>
    );
    const buttonPage = createButtonPage();

    expect(buttonPage.getButton()).toBeDisabled();
  });
});
