import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import AccessScreenShell from "../AccessScreenShell";
import { createAccessScreenShellPage } from "./AccessScreenShell.page";
import {
  CHILD_TEXT,
  TITLE_ID,
  TITLE_TEXT,
} from "./AccessScreenShell.constants";

const renderShell = () =>
  render(
    <AccessScreenShell titleId={TITLE_ID}>
      <h1 id={TITLE_ID}>{TITLE_TEXT}</h1>
      <p>{CHILD_TEXT}</p>
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
    expect(page.getCard()).not.toContainElement(
      page.getBackdrop() as HTMLElement
    );
  });
});
