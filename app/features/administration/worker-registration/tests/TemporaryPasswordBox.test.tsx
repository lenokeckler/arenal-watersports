import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import TemporaryPasswordBox from "../components/TemporaryPasswordBox";
import {
  TEMPORARY_PASSWORD_COPY_ANNOUNCEMENT,
  TEMPORARY_PASSWORD_COPY_LABEL,
  TEMPORARY_PASSWORD_COPY_PHASE,
} from "../constants/TemporaryPasswordCopy.constants";
import { ACTION_FIXTURE } from "./WorkerRegistrationAction.constants";

const stubClipboard = (writeText: () => Promise<void>) => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: vi.fn(writeText) },
  });

  return navigator.clipboard.writeText;
};

const renderBox = () => {
  const user = userEvent.setup();
  render(
    <TemporaryPasswordBox
      temporaryPassword={ACTION_FIXTURE.TEMPORARY_PASSWORD}
    />
  );

  return user;
};

const getCopyButton = (
  phase: keyof typeof TEMPORARY_PASSWORD_COPY_LABEL
) =>
  screen.getByRole("button", {
    name: TEMPORARY_PASSWORD_COPY_LABEL[phase],
  });

describe("TemporaryPasswordBox", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the temporary password next to the copy button", () => {
    renderBox();

    expect(
      screen.getByText(ACTION_FIXTURE.TEMPORARY_PASSWORD)
    ).toBeInTheDocument();
    expect(
      getCopyButton(TEMPORARY_PASSWORD_COPY_PHASE.IDLE)
    ).toBeInTheDocument();
  });

  it("copies the password and says so", async () => {
    const user = renderBox();
    const writeText = stubClipboard(() =>
      Promise.resolve()
    );

    await user.click(
      getCopyButton(TEMPORARY_PASSWORD_COPY_PHASE.IDLE)
    );

    expect(writeText).toHaveBeenCalledWith(
      ACTION_FIXTURE.TEMPORARY_PASSWORD
    );
    expect(
      getCopyButton(TEMPORARY_PASSWORD_COPY_PHASE.COPIED)
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      TEMPORARY_PASSWORD_COPY_ANNOUNCEMENT[
        TEMPORARY_PASSWORD_COPY_PHASE.COPIED
      ]
    );
  });

  it("tells the administrator to copy it by hand when the clipboard refuses", async () => {
    const user = renderBox();
    stubClipboard(() =>
      Promise.reject(new Error("denied"))
    );

    await user.click(
      getCopyButton(TEMPORARY_PASSWORD_COPY_PHASE.IDLE)
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      TEMPORARY_PASSWORD_COPY_ANNOUNCEMENT[
        TEMPORARY_PASSWORD_COPY_PHASE.FAILED
      ]
    );
    expect(
      getCopyButton(TEMPORARY_PASSWORD_COPY_PHASE.FAILED)
    ).toBeInTheDocument();
  });
});
