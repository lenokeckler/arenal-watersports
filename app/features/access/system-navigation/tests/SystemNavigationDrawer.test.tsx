import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import SystemNavigation from "../SystemNavigation";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import { SYSTEM_NAVIGATION_TEST_OVERVIEW } from "./SystemNavigation.constants";
import { createSystemNavigationPage } from "./SystemNavigation.page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/board",
}));

const IDENTITY = {
  fullName: "Ana Rojas",
  role: "Operaciones",
  username: "anarojas",
} as const;

const EXTRAS_TEXT = "Controles de sesión";

const renderNavigation = (
  overview = SYSTEM_NAVIGATION_TEST_OVERVIEW.ADMINISTRATION
) =>
  render(
    <SystemNavigation
      overview={overview}
      menuIdentity={IDENTITY}
      menuExtras={<p>{EXTRAS_TEXT}</p>}
    />
  );

it("shows the account Menu button in Administration mode too", () => {
  renderNavigation();

  expect(
    createSystemNavigationPage().queryMenuButton()
  ).not.toBeNull();
});

it("opens a panel with the person, the profile link and the session controls", async () => {
  const user = userEvent.setup();
  renderNavigation();

  await user.click(
    createSystemNavigationPage().getMenuButton()
  );

  expect(screen.getByText("Ana Rojas")).toBeVisible();
  expect(
    screen.getByText(
      `${SYSTEM_NAVIGATION_COPY.USER_PREFIX}: anarojas`
    )
  ).toBeVisible();
  expect(
    screen.getByText(
      `${SYSTEM_NAVIGATION_COPY.ROLE_PREFIX}: Operaciones`
    )
  ).toBeVisible();
  expect(
    screen.getByRole(ARIA_ROLE.LINK, {
      name: SYSTEM_NAVIGATION_COPY.PROFILE,
    })
  ).toBeVisible();
  expect(screen.getByText(EXTRAS_TEXT)).toBeVisible();
});

it("closes the panel with its close button", async () => {
  const user = userEvent.setup();
  renderNavigation();

  await user.click(
    createSystemNavigationPage().getMenuButton()
  );
  await user.click(
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: SYSTEM_NAVIGATION_COPY.CLOSE_MENU,
    })
  );

  expect(screen.queryByText("Ana Rojas")).not.toBeVisible();
});

it("does not show the person block when the identity is unknown", async () => {
  const user = userEvent.setup();
  render(
    <SystemNavigation
      overview={
        SYSTEM_NAVIGATION_TEST_OVERVIEW.ADMINISTRATION
      }
    />
  );

  await user.click(
    createSystemNavigationPage().getMenuButton()
  );

  expect(screen.queryByText("Ana Rojas")).toBeNull();
});
