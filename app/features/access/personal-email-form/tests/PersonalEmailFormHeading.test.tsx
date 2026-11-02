import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ARIA_ROLE,
  IMAGE_ALTS,
  PROFILE_SCREEN_TITLE_ID,
} from "@/app/constants";
import PersonalEmailFormHeading from "../components/PersonalEmailFormHeading";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import {
  HEADING_LEVEL,
  ID_ATTRIBUTE,
} from "./personalEmailScreen.constants";

describe("PersonalEmailFormHeading", () => {
  it("titles the screen with the id the layout card points at", () => {
    render(<PersonalEmailFormHeading />);

    expect(
      screen.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL,
        name: PERSONAL_EMAIL_FORM_COPY.HEADING,
      })
    ).toHaveAttribute(
      ID_ATTRIBUTE,
      PROFILE_SCREEN_TITLE_ID
    );
  });

  it("shows the logo and the instruction", () => {
    render(<PersonalEmailFormHeading />);

    expect(
      screen.getByAltText(IMAGE_ALTS.COMPANY_LOGO)
    ).toBeVisible();
    expect(
      screen.getByText(PERSONAL_EMAIL_FORM_COPY.INSTRUCTION)
    ).toBeVisible();
  });
});
