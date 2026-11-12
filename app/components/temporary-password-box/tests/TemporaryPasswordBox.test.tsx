import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import TemporaryPasswordBox from "../TemporaryPasswordBox";
import {
  TEMPORARY_PASSWORD_COPY_ANNOUNCEMENT,
  TEMPORARY_PASSWORD_COPY_LABEL,
  TEMPORARY_PASSWORD_COPY_PHASE,
} from "../constants/TemporaryPasswordBox.constants";
import { TEMPORARY_PASSWORD_FIXTURE } from "./TemporaryPasswordBox.constants";

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
      temporaryPassword={TEMPORARY_PASSWORD_FIXTURE}
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
      screen.getByText(TEMPORARY_PASSWORD_FIXTURE)
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
      TEMPORARY_PASSWORD_FIXTURE
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
