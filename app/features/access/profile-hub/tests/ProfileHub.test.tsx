import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import {
  PATHS,
  PROFILE_SCREEN_TITLE_ID,
} from "@/app/constants";
import ProfileHub from "../ProfileHub";
import {
  ARIA_HIDDEN_ATTRIBUTE,
  ARIA_HIDDEN_VALUE,
  ARRAY_NOTICE,
  HREF_ATTRIBUTE,
  ID_ATTRIBUTE,
  NOTICE_CASES,
  UNKNOWN_NOTICE,
} from "./ProfileHub.constants";
import { createProfileHubPage } from "./ProfileHub.page";

describe("ProfileHub without a notice", () => {
  it("titles the screen with the id the layout card points at", () => {
    render(<ProfileHub notice={undefined} />);
    const page = createProfileHubPage();

    expect(page.getTitle()).toHaveAttribute(
      ID_ATTRIBUTE,
      PROFILE_SCREEN_TITLE_ID
    );
  });

  it("shows the logo", () => {
    render(<ProfileHub notice={undefined} />);

    expect(createProfileHubPage().getLogo()).toBeVisible();
  });

  it("links the only entry to the password change screen", () => {
    render(<ProfileHub notice={undefined} />);

    expect(
      createProfileHubPage().getEntryLink()
    ).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.PROFILE.PASSWORD
    );
  });

  it("hides both entry icons from assistive technology", () => {
    render(<ProfileHub notice={undefined} />);
    const page = createProfileHubPage();

    expect(page.getLeadingIcon()).toHaveAttribute(
      ARIA_HIDDEN_ATTRIBUTE,
      ARIA_HIDDEN_VALUE
    );
    expect(page.getChevron()).toHaveAttribute(
      ARIA_HIDDEN_ATTRIBUTE,
      ARIA_HIDDEN_VALUE
    );
  });

  it("shows no notice", () => {
    render(<ProfileHub notice={undefined} />);

    expect(
      createProfileHubPage().queryNotice()
    ).not.toBeInTheDocument();
  });
});

describe("ProfileHub with a notice param", () => {
  it.each(NOTICE_CASES)(
    "shows the message of the %s notice",
    (notice, message) => {
      render(<ProfileHub notice={notice} />);

      expect(
        createProfileHubPage().queryNotice()
      ).toHaveTextContent(message);
    }
  );

  it("shows no notice for an unknown value", () => {
    render(<ProfileHub notice={UNKNOWN_NOTICE} />);

    expect(
      createProfileHubPage().queryNotice()
    ).not.toBeInTheDocument();
  });

  it("shows no notice for a repeated param", () => {
    render(<ProfileHub notice={ARRAY_NOTICE} />);

    expect(
      createProfileHubPage().queryNotice()
    ).not.toBeInTheDocument();
  });
});
