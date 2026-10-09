import { describe, expect, it } from "vitest";
import { PERSONAL_EMAIL_INTENT } from "@/app/constants";
import { resolveSubmittedPersonalEmailIntent } from "../utils/resolveSubmittedPersonalEmailIntent";
import {
  createPressedButton,
  createSubmitEvent,
} from "./createPersonalEmailSubmitEvent";
import { OTHER_INTENT } from "./personalEmailForm.constants";

describe("resolveSubmittedPersonalEmailIntent", () => {
  it.each(Object.values(PERSONAL_EMAIL_INTENT))(
    "reads the %s intent from the pressed button",
    (intent) => {
      const event = createSubmitEvent(
        createPressedButton(intent)
      );

      expect(
        resolveSubmittedPersonalEmailIntent(event)
      ).toBe(intent);
    }
  );

  it("treats an implicit submission without a submitter as save", () => {
    expect(
      resolveSubmittedPersonalEmailIntent(
        createSubmitEvent()
      )
    ).toBe(PERSONAL_EMAIL_INTENT.SAVE);
  });

  it("treats an unknown button value as save", () => {
    const event = createSubmitEvent(
      createPressedButton(OTHER_INTENT)
    );

    expect(resolveSubmittedPersonalEmailIntent(event)).toBe(
      PERSONAL_EMAIL_INTENT.SAVE
    );
  });

  it("treats a submitter that is not a button as save", () => {
    const submitter = document.createElement("input");
    submitter.value = PERSONAL_EMAIL_INTENT.REMOVE;

    expect(
      resolveSubmittedPersonalEmailIntent(
        createSubmitEvent(submitter)
      )
    ).toBe(PERSONAL_EMAIL_INTENT.SAVE);
  });
});
