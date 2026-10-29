import { describe, expect, it } from "vitest";
import { isNewFocusRequest } from "../isNewFocusRequest";
import {
  IDLE_TRIGGER,
  ONE_INVALID_SUBMIT,
  WITH_OTHER_SERVER_ERROR,
  WITH_SERVER_ERROR,
} from "./isNewFocusRequest.constants";

describe("isNewFocusRequest", () => {
  it("is false when nothing changed", () => {
    expect(
      isNewFocusRequest(IDLE_TRIGGER, IDLE_TRIGGER)
    ).toBe(false);
  });

  it("is true when another invalid submit was counted", () => {
    expect(
      isNewFocusRequest(IDLE_TRIGGER, ONE_INVALID_SUBMIT)
    ).toBe(true);
  });

  it("is true when a server error arrives", () => {
    expect(
      isNewFocusRequest(IDLE_TRIGGER, WITH_SERVER_ERROR)
    ).toBe(true);
  });

  it("is true when a different server error replaces the handled one", () => {
    expect(
      isNewFocusRequest(
        WITH_SERVER_ERROR,
        WITH_OTHER_SERVER_ERROR
      )
    ).toBe(true);
  });

  it("is false for the server error already handled", () => {
    expect(
      isNewFocusRequest(
        WITH_SERVER_ERROR,
        WITH_SERVER_ERROR
      )
    ).toBe(false);
  });

  it("is false when the server error was cleared", () => {
    expect(
      isNewFocusRequest(WITH_SERVER_ERROR, IDLE_TRIGGER)
    ).toBe(false);
  });
});
