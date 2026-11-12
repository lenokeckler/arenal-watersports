import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProfilePage from "@/app/(system)/profile/page";
import { PROFILE_NOTICE_QUERY_PARAM } from "@/app/constants";
import type { ProfileHubProps } from "../models/ProfileHubProps.interface";
import {
  HUB_NOTICE_ATTRIBUTE,
  HUB_TEST_ID,
  NOTICE_CASES,
} from "./ProfileHub.constants";

vi.mock("../ProfileHub", () => ({
  default: ({ notice }: ProfileHubProps) => (
    <div
      data-testid={HUB_TEST_ID}
      data-notice={notice?.toString()}
    />
  ),
}));

const renderPage = async (
  searchParams: Record<
    string,
    string | string[] | undefined
  >
) =>
  render(
    await ProfilePage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve(searchParams),
    })
  );

describe("ProfilePage", () => {
  it.each(NOTICE_CASES)(
    "hands the %s notice query param to the hub",
    async (notice) => {
      await renderPage({
        [PROFILE_NOTICE_QUERY_PARAM]: notice,
      });

      expect(
        screen.getByTestId(HUB_TEST_ID)
      ).toHaveAttribute(HUB_NOTICE_ATTRIBUTE, notice);
    }
  );

  it("hands no notice to the hub when the query is empty", async () => {
    await renderPage({});

    expect(
      screen.getByTestId(HUB_TEST_ID)
    ).not.toHaveAttribute(HUB_NOTICE_ATTRIBUTE);
  });
});
