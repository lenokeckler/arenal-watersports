import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import ProfilePage from "@/app/(system)/profile/page";
import {
  PROFILE_NOTICE,
  PROFILE_NOTICE_QUERY_PARAM,
} from "@/app/constants";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import { createProfileHubPage } from "./ProfileHub.page";
import { UNKNOWN_NOTICE } from "./ProfileHub.constants";

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
  it("shows the password changed notice from the notice query param", async () => {
    await renderPage({
      [PROFILE_NOTICE_QUERY_PARAM]:
        PROFILE_NOTICE.PASSWORD_CHANGED,
    });

    expect(
      createProfileHubPage().queryNotice()
    ).toHaveTextContent(
      PROFILE_COPY.PASSWORD_CHANGED_NOTICE
    );
  });

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
