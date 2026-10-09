import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { listAttributeValuesHoldingText } from "@/app/utils/dom/tests/listAttributeValuesHoldingText";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import {
  ANY_WHITESPACE,
  ARIA_HIDDEN_ATTRIBUTE,
  ARIA_HIDDEN_VALUE,
  CHEVRON_RIGHT_ICON_NAME,
  ENTRY_COUNT,
  HREF_ATTRIBUTE,
  LOCK_RESET_ICON_NAME,
  NOT_REGISTERED_STATE,
  OWN_PERSONAL_EMAIL_ADDRESS,
} from "./ProfileHub.constants";
import { createProfileHubPage } from "./ProfileHub.page";
import { renderProfileHub } from "./renderProfileHub";

vi.mock("@/app/services/authentication", () => ({
  readOwnPersonalEmail: vi.fn(),
}));

describe("ProfileHub entries", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("lists the entries as list items", async () => {
    await renderProfileHub();
    const page = createProfileHubPage();

    expect(page.getEntryList()).toBeVisible();
    expect(page.getEntryListItems()).toHaveLength(
      ENTRY_COUNT
    );
  });

  it("names the email entry with its label then its status", async () => {
    await renderProfileHub();

    expect(
      createProfileHubPage().getEmailEntryLink(
        new RegExp(
          `${PROFILE_COPY.PERSONAL_EMAIL_ENTRY}${ANY_WHITESPACE}${PROFILE_COPY.STATUS_REGISTERED}`
        )
      )
    ).toHaveAttribute(HREF_ATTRIBUTE, PATHS.PROFILE.EMAIL);
  });

  it("names the email entry as not registered without an address", async () => {
    await renderProfileHub(undefined, NOT_REGISTERED_STATE);

    expect(
      createProfileHubPage().getEmailEntryLink(
        new RegExp(
          `${PROFILE_COPY.PERSONAL_EMAIL_ENTRY}${ANY_WHITESPACE}${PROFILE_COPY.STATUS_NOT_REGISTERED}`
        )
      )
    ).toBeVisible();
  });

  it("adds no status line to the password entry", async () => {
    await renderProfileHub();

    expect(
      createProfileHubPage().getEntryLink().textContent
    ).toBe(
      `${LOCK_RESET_ICON_NAME}${PROFILE_COPY.PASSWORD_ENTRY}${CHEVRON_RIGHT_ICON_NAME}`
    );
  });

  it("hides every icon from assistive technology", async () => {
    await renderProfileHub();
    const page = createProfileHubPage();

    [
      page.getLeadingIcon(),
      page.getMailIcon(),
      ...page.getChevrons(),
    ].forEach((icon) =>
      expect(icon).toHaveAttribute(
        ARIA_HIDDEN_ATTRIBUTE,
        ARIA_HIDDEN_VALUE
      )
    );
  });

  it("never shows the address in the text or in any attribute", async () => {
    const { container } = await renderProfileHub();

    expect(container).not.toHaveTextContent(
      OWN_PERSONAL_EMAIL_ADDRESS
    );
    expect(
      listAttributeValuesHoldingText(
        container,
        OWN_PERSONAL_EMAIL_ADDRESS
      )
    ).toEqual([]);
  });
});
