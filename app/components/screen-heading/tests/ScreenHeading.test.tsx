import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import ScreenHeading from "../ScreenHeading";

const TITLE = "Daños";
const ACTION = {
  href: PATHS.OPERATIONS.DAMAGE_REPORT,
  label: "Reportar daño",
};

describe("ScreenHeading", () => {
  afterEach(cleanup);

  it("shows the title with its main action", () => {
    render(
      <ScreenHeading
        action={ACTION}
        title={TITLE}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: ACTION.label,
      })
    ).toHaveAttribute("href", ACTION.href);
  });

  it("shows only the title when there is no action", () => {
    render(<ScreenHeading title={TITLE} />);

    expect(
      screen.queryByRole(ARIA_ROLE.LINK)
    ).not.toBeInTheDocument();
  });
});
