import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import PasswordRecoveryRequestHeading from "../components/PasswordRecoveryRequestHeading";
import PasswordRecoveryResetHeading from "../components/PasswordRecoveryResetHeading";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import {
  IMAGE_ROLE,
  PAGE_HEADING_LEVEL,
  SECOND_HEADING_LEVEL,
} from "./passwordRecoveryScreen.constants";

describe("PasswordRecoveryRequestHeading", () => {
  it("titles the step with a second level heading, not another page title", () => {
    render(<PasswordRecoveryRequestHeading />);

    expect(
      screen.getByRole(ARIA_ROLE.HEADING, {
        level: SECOND_HEADING_LEVEL,
        name: PASSWORD_RECOVERY_REQUEST_COPY.HEADING,
      })
    ).toBeVisible();
    expect(
      screen.queryByRole(ARIA_ROLE.HEADING, {
        level: PAGE_HEADING_LEVEL,
      })
    ).toBeNull();
  });

  it("shows the instruction and no logo", () => {
    render(<PasswordRecoveryRequestHeading />);

    expect(
      screen.getByText(
        PASSWORD_RECOVERY_REQUEST_COPY.INSTRUCTION
      )
    ).toBeVisible();
    expect(screen.queryByRole(IMAGE_ROLE)).toBeNull();
  });
});

describe("PasswordRecoveryResetHeading", () => {
  it("titles the step with a second level heading", () => {
    render(<PasswordRecoveryResetHeading />);

    expect(
      screen.getByRole(ARIA_ROLE.HEADING, {
        level: SECOND_HEADING_LEVEL,
        name: PASSWORD_RECOVERY_RESET_COPY.HEADING,
      })
    ).toBeVisible();
  });
});
