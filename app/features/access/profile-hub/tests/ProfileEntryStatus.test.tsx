import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import ProfileEntryStatus from "../ProfileEntryStatus";

describe("ProfileEntryStatus", () => {
  it("renders nothing for a null status", () => {
    const { container } = render(
      <ProfileEntryStatus status={null} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders the status text", () => {
    render(
      <ProfileEntryStatus
        status={PROFILE_COPY.STATUS_REGISTERED}
      />
    );

    expect(
      screen.getByText(PROFILE_COPY.STATUS_REGISTERED)
    ).toBeVisible();
  });
});
