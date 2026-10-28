import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoginPage from "@/app/access/login/page";
import { LOGIN_NOTICE_QUERY_PARAM } from "@/app/constants";
import type { LoginFormProps } from "../models/LoginFormProps.interface";
import {
  LOGIN_FORM_TEST_ID,
  LOGIN_NOTICE_ATTRIBUTE,
  UNKNOWN_LOGIN_NOTICE,
} from "./LoginNotice.constants";

vi.mock(
  "@/app/features/access/login-form/LoginForm",
  () => ({
    default: ({ notice }: LoginFormProps) => (
      <div
        data-testid={LOGIN_FORM_TEST_ID}
        data-notice={notice?.toString()}
      />
    ),
  })
);

const renderPage = async (
  searchParams: Record<
    string,
    string | string[] | undefined
  >
) =>
  render(
    await LoginPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve(searchParams),
    })
  );

describe("LoginPage", () => {
  it("hands the notice query param to the form", async () => {
    await renderPage({
      [LOGIN_NOTICE_QUERY_PARAM]: UNKNOWN_LOGIN_NOTICE,
    });

    expect(
      screen.getByTestId(LOGIN_FORM_TEST_ID)
    ).toHaveAttribute(
      LOGIN_NOTICE_ATTRIBUTE,
      UNKNOWN_LOGIN_NOTICE
    );
  });

  it("hands no notice to the form when the query is empty", async () => {
    await renderPage({});

    expect(
      screen.getByTestId(LOGIN_FORM_TEST_ID)
    ).not.toHaveAttribute(LOGIN_NOTICE_ATTRIBUTE);
  });
});
