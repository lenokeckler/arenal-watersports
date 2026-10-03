import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Text } from "@/app/components";
import AccessLayout from "@/app/acceso/layout";
import { createAccessLayoutPage } from "./AccessLayout.page";
import { CHILD_TEXT } from "./AccessScreenShell.constants";

describe("AccessLayout", () => {
  it("renders its children inside the main landmark", () => {
    render(
      <AccessLayout>
        <Text>{CHILD_TEXT}</Text>
      </AccessLayout>
    );
    const page = createAccessLayoutPage();

    expect(page.getMain()).toContainElement(
      page.getChild()
    );
  });
});
