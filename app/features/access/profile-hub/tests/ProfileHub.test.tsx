import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PATHS,
  PROFILE_SCREEN_TITLE_ID,
} from "@/app/constants";
import { renderProfileHub } from "./renderProfileHub";
import {
  ARRAY_NOTICE,
  HREF_ATTRIBUTE,
  ID_ATTRIBUTE,
  NOTICE_CASES,
  UNKNOWN_NOTICE,
} from "./ProfileHub.constants";
import { createProfileHubPage } from "./ProfileHub.page";

vi.mock("@/app/services/authentication", () => ({
  readOwnPersonalEmail: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe("ProfileHub without a notice", () => {
  it("titles the screen with the id the layout card points at", async () => {
    await renderProfileHub(undefined);
    const page = createProfileHubPage();

    expect(page.getTitle()).toHaveAttribute(
      ID_ATTRIBUTE,
      PROFILE_SCREEN_TITLE_ID
    );
  });

  it("shows the logo", async () => {
    await renderProfileHub(undefined);

    expect(createProfileHubPage().getLogo()).toBeVisible();
  });

  it("links the password entry to the password change screen", async () => {
    await renderProfileHub(undefined);

    expect(
      createProfileHubPage().getEntryLink()
    ).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.PROFILE.PASSWORD
    );
  });

  it("shows no notice", async () => {
    await renderProfileHub(undefined);

    expect(
      createProfileHubPage().queryNotice()
    ).not.toBeInTheDocument();
  });
});

describe("ProfileHub with a notice param", () => {
  it.each(NOTICE_CASES)(
    "shows the message of the %s notice",
    async (notice, message) => {
      await renderProfileHub(notice);

      expect(
        createProfileHubPage().queryNotice()
      ).toHaveTextContent(message);
    }
  );

  it("shows no notice for an unknown value", async () => {
    await renderProfileHub(UNKNOWN_NOTICE);

    expect(
      createProfileHubPage().queryNotice()
    ).not.toBeInTheDocument();
  });

  it("shows no notice for a repeated param", async () => {
    await renderProfileHub(ARRAY_NOTICE);

    expect(
      createProfileHubPage().queryNotice()
    ).not.toBeInTheDocument();
  });
});
