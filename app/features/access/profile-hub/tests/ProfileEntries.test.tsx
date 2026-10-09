import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS } from "@/app/constants";
import { listAttributeValuesHoldingText } from "@/app/utils/dom/tests/listAttributeValuesHoldingText";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import {
  ARIA_HIDDEN_ATTRIBUTE,
  ARIA_HIDDEN_VALUE,
  EMAIL_ENTRY_NOT_REGISTERED_NAME,
  EMAIL_ENTRY_REGISTERED_NAME,
  EMAIL_ENTRY_WITHOUT_STATUS_NAME,
  ENTRY_DEFINITIONS,
  HREF_ATTRIBUTE,
  NOT_REGISTERED_STATE,
  OWN_PERSONAL_EMAIL_ADDRESS,
} from "./ProfileHub.constants";
import { createProfileHubPage } from "./ProfileHub.page";
import {
  renderProfileHub,
  renderProfileHubWithFailedRead,
} from "./renderProfileHub";

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
      ENTRY_DEFINITIONS.length
    );
  });

  it("names the email entry with its label then its status", async () => {
    await renderProfileHub();

    expect(
      createProfileHubPage().getEmailEntryLink(
        EMAIL_ENTRY_REGISTERED_NAME
      )
    ).toHaveAttribute(HREF_ATTRIBUTE, PATHS.PROFILE.EMAIL);
  });

  it("names the email entry as not registered without an address", async () => {
    await renderProfileHub(undefined, NOT_REGISTERED_STATE);

    expect(
      createProfileHubPage().getEmailEntryLink(
        EMAIL_ENTRY_NOT_REGISTERED_NAME
      )
    ).toBeVisible();
  });

  it("keeps both entries and shows no status when the read fails", async () => {
    await renderProfileHubWithFailedRead();
    const page = createProfileHubPage();

    expect(page.getEntryListItems()).toHaveLength(
      ENTRY_DEFINITIONS.length
    );
    expect(
      page.getEmailEntryLink(
        EMAIL_ENTRY_WITHOUT_STATUS_NAME
      )
    ).toHaveAttribute(HREF_ATTRIBUTE, PATHS.PROFILE.EMAIL);
    expect(
      page.queryText(PROFILE_COPY.STATUS_NOT_REGISTERED)
    ).not.toBeInTheDocument();
  });

  it("adds no status line to the password entry", async () => {
    await renderProfileHub();

    expect(
      createProfileHubPage().getEntryLink().textContent
    ).toBe(
      `${MATERIAL_ICON_NAME.LOCK_RESET}${PROFILE_COPY.PASSWORD_ENTRY}${MATERIAL_ICON_NAME.CHEVRON_RIGHT}`
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
