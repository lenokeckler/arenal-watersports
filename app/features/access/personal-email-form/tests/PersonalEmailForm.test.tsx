import { render } from "@testing-library/react";
import { redirect } from "next/navigation";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, STRING } from "@/app/constants";
import { readOwnPersonalEmail } from "@/app/services/authentication";
import { PERSONAL_EMAIL_REQUIRED_COPY } from "../constants/PersonalEmailErrorCopy.constants";
import PersonalEmailForm from "../PersonalEmailForm";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import { listAttributeValuesHoldingText } from "@/app/utils/dom/tests/listAttributeValuesHoldingText";
import {
  REGISTERED_ADDRESS,
  VALUE_ATTRIBUTE,
} from "./personalEmailScreen.constants";
import { createPersonalEmailFormViewPage } from "./PersonalEmailFormView.page";

vi.mock("../actions/submitPersonalEmail", () => ({
  submitPersonalEmail: vi.fn(),
}));

vi.mock("@/app/services/authentication", () => ({
  readOwnPersonalEmail: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

const renderEntry = async (
  state: Awaited<ReturnType<typeof readOwnPersonalEmail>>
) => {
  vi.mocked(readOwnPersonalEmail).mockResolvedValue(state);
  const { container } = render(await PersonalEmailForm());
  return {
    container,
    page: createPersonalEmailFormViewPage(),
  };
};

describe("PersonalEmailForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it("offers removal to a worker with a registered address", async () => {
    const { page } = await renderEntry({
      address: REGISTERED_ADDRESS,
      isRequired: false,
    });

    expect(page.getEmailInput()).toHaveValue(
      REGISTERED_ADDRESS
    );
    expect(page.getRemove()).toBeVisible();
  });

  it("does not offer removal to administration", async () => {
    const { page } = await renderEntry({
      address: REGISTERED_ADDRESS,
      isRequired: true,
    });

    expect(page.queryRemove()).toBeNull();
  });

  it("starts empty and without removal when no address is registered", async () => {
    const { page } = await renderEntry({
      address: null,
      isRequired: false,
    });

    expect(page.getEmailInput()).toHaveValue(STRING.Empty);
    expect(page.queryRemove()).toBeNull();
  });

  it("never prints the address outside the input", async () => {
    const { container, page } = await renderEntry({
      address: REGISTERED_ADDRESS,
      isRequired: false,
    });

    expect(container).not.toHaveTextContent(
      REGISTERED_ADDRESS
    );
    expect(page.queryText(REGISTERED_ADDRESS)).toBeNull();
    expect(
      listAttributeValuesHoldingText(
        container,
        REGISTERED_ADDRESS,
        {
          attribute: VALUE_ATTRIBUTE,
          element: page.getEmailInput(),
        }
      )
    ).toEqual([]);
  });

  it("explains an empty save to administration with the required copy", async () => {
    const { page } = await renderEntry({
      address: null,
      isRequired: true,
    });

    await page.clickSave();

    expect(
      await page.findText(
        PERSONAL_EMAIL_REQUIRED_COPY.ADMINISTRATION
      )
    ).toBeVisible();
  });

  it("sends the visitor to the login when nobody is signed in", async () => {
    vi.mocked(readOwnPersonalEmail).mockResolvedValue(null);

    await expect(PersonalEmailForm()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );
    expect(redirect).toHaveBeenCalledExactlyOnceWith(
      PATHS.ACCESS.LOGIN
    );
  });
});
