import { describe, expect, it } from "vitest";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import {
  PASSWORD_ENTRY_DEFINITION,
  PERSONAL_EMAIL_ENTRY_DEFINITION,
} from "../constants/ProfileEntries.constants";
import { buildProfileEntries } from "../utils/buildProfileEntries";

describe("buildProfileEntries", () => {
  it("lists the password row first and the email row second", () => {
    const entries = buildProfileEntries({
      hasPersonalEmail: true,
    });

    expect(entries.map(({ id }) => id)).toEqual([
      PASSWORD_ENTRY_DEFINITION.id,
      PERSONAL_EMAIL_ENTRY_DEFINITION.id,
    ]);
  });

  it.each([true, false])(
    "gives the password row no status when hasPersonalEmail is %s",
    (hasPersonalEmail) => {
      const [passwordEntry] = buildProfileEntries({
        hasPersonalEmail,
      });

      expect(passwordEntry).toEqual({
        ...PASSWORD_ENTRY_DEFINITION,
        status: null,
      });
    }
  );

  it("marks the email row as registered when an address exists", () => {
    const [, emailEntry] = buildProfileEntries({
      hasPersonalEmail: true,
    });

    expect(emailEntry).toEqual({
      ...PERSONAL_EMAIL_ENTRY_DEFINITION,
      status: PROFILE_COPY.STATUS_REGISTERED,
    });
  });

  it("marks the email row as not registered without an address", () => {
    const [, emailEntry] = buildProfileEntries({
      hasPersonalEmail: false,
    });

    expect(emailEntry).toEqual({
      ...PERSONAL_EMAIL_ENTRY_DEFINITION,
      status: PROFILE_COPY.STATUS_NOT_REGISTERED,
    });
  });
});
