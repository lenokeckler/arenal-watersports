import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SIGN_IN_ERROR_CODE } from "@/app/constants";
import { SIGN_IN_ERROR_COPY } from "@/app/features/access/login-form/constants/SignInErrorCopy.constants";
import LoginPage from "../page";
import {
  INACTIVE_SEARCH_PARAMS,
  NO_SEARCH_PARAMS,
  REPEATED_INACTIVE_SEARCH_PARAMS,
  UNRELATED_SEARCH_PARAMS,
} from "./LoginPage.constants";

const INACTIVITY_COPY =
  SIGN_IN_ERROR_COPY[SIGN_IN_ERROR_CODE.SESSION_INACTIVE];

const renderPage = async (
  searchParams: Record<string, string | string[]>
) =>
  render(
    await LoginPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve(searchParams),
    })
  );

describe("LoginPage", () => {
  it("shows the inactivity notice for the inactive reason", async () => {
    await renderPage(INACTIVE_SEARCH_PARAMS);

    expect(
      await screen.findByText(INACTIVITY_COPY)
    ).toBeInTheDocument();
  });

  it.each([
    ["no search params", NO_SEARCH_PARAMS],
    ["a repeated reason", REPEATED_INACTIVE_SEARCH_PARAMS],
    ["an unrelated param", UNRELATED_SEARCH_PARAMS],
  ])("shows no notice for %s", async (_name, params) => {
    await renderPage(params);

    expect(
      screen.queryByText(INACTIVITY_COPY)
    ).not.toBeInTheDocument();
  });
});
