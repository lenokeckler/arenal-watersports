import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import AccessScreenShell from "../AccessScreenShell";
import {
  ACCESS_SHELL_CONTENT_CLASS,
  ACCESS_SHELL_EMBEDDED_CONTENT_CLASS,
  ACCESS_SHELL_EMBEDDED_PAGE_CLASS,
  ACCESS_SHELL_PAGE_CLASS,
} from "../styles/AccessScreenShell.styles";
import { createAccessScreenShellPage } from "./AccessScreenShell.page";
import {
  ARIA_HIDDEN_ATTRIBUTE,
  ARIA_HIDDEN_VALUE,
  CHILD_TEXT,
  TITLE_ID,
  TITLE_TEXT,
} from "./AccessScreenShell.constants";

const renderShell = (isEmbedded?: boolean) =>
  render(
    <AccessScreenShell
      titleId={TITLE_ID}
      isEmbedded={isEmbedded}
    >
      <Title
        id={TITLE_ID}
        variant={TitleVariant.PRIMARY}
        text={TITLE_TEXT}
      />
      <Text>{CHILD_TEXT}</Text>
    </AccessScreenShell>
  );

describe("AccessScreenShell", () => {
  it("labels the card region with the title element", () => {
    renderShell();
    const page = createAccessScreenShellPage();

    expect(page.getCard()).toBeInTheDocument();
  });

  it("renders its children inside the card", () => {
    renderShell();
    const page = createAccessScreenShellPage();

    expect(page.getCard()).toContainElement(
      page.getChild()
    );
  });

  it("hides the decorative backdrop from assistive technology", () => {
    renderShell();
    const page = createAccessScreenShellPage();

    expect(page.getBackdrop()).toBeInTheDocument();
    expect(page.getBackdrop()).toHaveAttribute(
      ARIA_HIDDEN_ATTRIBUTE,
      ARIA_HIDDEN_VALUE
    );
    expect(page.getCard()).not.toContainElement(
      page.getBackdrop()
    );
  });

  it("keeps the full-screen page and content classes by default", () => {
    renderShell();
    const page = createAccessScreenShellPage();

    expect(page.getPage()).toHaveClass(
      ACCESS_SHELL_PAGE_CLASS,
      { exact: true }
    );
    expect(page.getContent()).toHaveClass(
      ACCESS_SHELL_CONTENT_CLASS,
      { exact: true }
    );
  });

  it("uses the full-screen classes when isEmbedded is false", () => {
    renderShell(false);
    const page = createAccessScreenShellPage();

    expect(page.getPage()).toHaveClass(
      ACCESS_SHELL_PAGE_CLASS,
      { exact: true }
    );
    expect(page.getContent()).toHaveClass(
      ACCESS_SHELL_CONTENT_CLASS,
      { exact: true }
    );
  });

  it("switches the page and content wrappers to the embedded classes when isEmbedded is true", () => {
    renderShell(true);
    const page = createAccessScreenShellPage();

    expect(page.getPage()).toHaveClass(
      ACCESS_SHELL_EMBEDDED_PAGE_CLASS,
      { exact: true }
    );
    expect(page.getContent()).toHaveClass(
      ACCESS_SHELL_EMBEDDED_CONTENT_CLASS,
      { exact: true }
    );
  });
});
