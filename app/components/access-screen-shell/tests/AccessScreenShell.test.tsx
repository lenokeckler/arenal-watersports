import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import AccessScreenShell from "../AccessScreenShell";
import { createAccessScreenShellPage } from "./AccessScreenShell.page";
import {
  ARIA_HIDDEN_ATTRIBUTE,
  ARIA_HIDDEN_VALUE,
  CHILD_TEXT,
  TITLE_ID,
  TITLE_TEXT,
} from "./AccessScreenShell.constants";

const renderShell = () =>
  render(
    <AccessScreenShell titleId={TITLE_ID}>
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
});
