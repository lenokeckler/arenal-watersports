import { describe, expect, it } from "vitest";
import { PERSONAL_EMAIL_STATE } from "../constants/PersonalEmailState.constants";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import {
  PASSWORD_ENTRY_DEFINITION,
  PERSONAL_EMAIL_ENTRY_DEFINITION,
} from "../constants/ProfileEntries.constants";
import { buildProfileEntries } from "../utils/buildProfileEntries";

describe("buildProfileEntries", () => {
  it("lists the password row first and the email row second", () => {
    const entries = buildProfileEntries({
      personalEmailState: PERSONAL_EMAIL_STATE.REGISTERED,
    });

    expect(entries.map(({ id }) => id)).toEqual([
      PASSWORD_ENTRY_DEFINITION.id,
      PERSONAL_EMAIL_ENTRY_DEFINITION.id,
    ]);
  });

  it.each(Object.values(PERSONAL_EMAIL_STATE))(
    "gives the password row no status when the email state is %s",
    (personalEmailState) => {
      const [passwordEntry] = buildProfileEntries({
        personalEmailState,
      });

      expect(passwordEntry).toEqual({
        ...PASSWORD_ENTRY_DEFINITION,
        status: null,
      });
    }
  );

  it("marks the email row as registered when an address exists", () => {
    const [, emailEntry] = buildProfileEntries({
      personalEmailState: PERSONAL_EMAIL_STATE.REGISTERED,
    });

    expect(emailEntry).toEqual({
      ...PERSONAL_EMAIL_ENTRY_DEFINITION,
      status: PROFILE_COPY.STATUS_REGISTERED,
    });
  });

  it("marks the email row as not registered without an address", () => {
    const [, emailEntry] = buildProfileEntries({
      personalEmailState:
        PERSONAL_EMAIL_STATE.NOT_REGISTERED,
    });

    expect(emailEntry).toEqual({
      ...PERSONAL_EMAIL_ENTRY_DEFINITION,
      status: PROFILE_COPY.STATUS_NOT_REGISTERED,
    });
  });

  it("gives the email row no status when the state is unknown", () => {
    const [, emailEntry] = buildProfileEntries({
      personalEmailState: PERSONAL_EMAIL_STATE.UNKNOWN,
    });

    expect(emailEntry).toEqual({
      ...PERSONAL_EMAIL_ENTRY_DEFINITION,
      status: null,
    });
  });
});
