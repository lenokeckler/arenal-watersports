import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import ProfilePage from "@/app/(system)/profile/page";
import { PROFILE_NOTICE_QUERY_PARAM } from "@/app/constants";
import { createProfileHubPage } from "./ProfileHub.page";
import {
  NOTICE_CASES,
  UNKNOWN_NOTICE,
} from "./ProfileHub.constants";

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
    "shows the message of the %s notice from the notice query param",
    async (notice, message) => {
      await renderPage({
        [PROFILE_NOTICE_QUERY_PARAM]: notice,
      });

      expect(
        createProfileHubPage().queryNotice()
      ).toHaveTextContent(message);
    }
  );

  it("shows no notice when the query is empty", async () => {
    await renderPage({});

    expect(
      createProfileHubPage().queryNotice()
    ).not.toBeInTheDocument();
  });

  it("ignores a notice query param it does not know", async () => {
    await renderPage({
      [PROFILE_NOTICE_QUERY_PARAM]: UNKNOWN_NOTICE,
    });

    expect(
      createProfileHubPage().queryNotice()
    ).not.toBeInTheDocument();
  });
});
