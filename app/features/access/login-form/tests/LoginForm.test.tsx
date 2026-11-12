import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginForm from "../LoginForm";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { INACTIVITY_NOTICE } from "./resolveLoginFormErrors.constants";
import {
  KNOWN_REASON,
  UNKNOWN_REASON,
} from "./LoginForm.constants";

const INACTIVITY_COPY =
  SIGN_IN_ERROR_COPY[INACTIVITY_NOTICE.code];

describe("LoginForm", () => {
  it("resolves a known reason into the banner notice", async () => {
    render(
      <LoginForm
        notice={undefined}
        reason={KNOWN_REASON}
      />
    );

    expect(
      await screen.findByText(INACTIVITY_COPY)
    ).toBeInTheDocument();
  });

  it.each([UNKNOWN_REASON, undefined, [KNOWN_REASON]])(
    "shows no notice for the reason %j",
    (reason) => {
      render(
        <LoginForm
          notice={undefined}
          reason={reason}
        />
      );

      expect(
        screen.queryByText(INACTIVITY_COPY)
      ).not.toBeInTheDocument();
    }
  );
});
