import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, STRING } from "@/app/constants";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { UNIT_DECOMMISSION_COPY } from "../constants/UnitDecommissionCopy.constants";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import type { UnitFormMode } from "../constants/UnitFormMode.constants";
import type { UnitStatus } from "../constants/UnitStatus.constants";
import type { UnitFormFieldEntry } from "./models/UnitFormFieldEntry.interface";
import { FORM_SUBMIT_LABEL } from "./UnitForm.constants";

const FIRST_INDEX = 0;
const LAST_INDEX = -1;
const { OPEN_BUTTON, CONFIRM_BUTTON, CANCEL_BUTTON } =
  UNIT_DECOMMISSION_COPY;

export const createUnitFormPage = (mode: UnitFormMode) => {
  const user = userEvent.setup();
  const options = { exact: false };

  const getControl = (label: string) =>
    screen.getByLabelText(label, options);

  const getStatusSelect = () =>
    getControl(UNIT_FORM_COPY.STATUS_LABEL);

  const getButtons = (name: string) =>
    screen.queryAllByRole(ARIA_ROLE.BUTTON, { name });

  const getButton = (name: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name });

  const typeInto = async (entry: UnitFormFieldEntry) => {
    const field = getControl(entry.label);
    await user.clear(field);
    if (entry.text) {
      await user.type(field, entry.text);
    }
  };

  const getDecommissionCancel = () =>
    getButtons(CANCEL_BUTTON).at(LAST_INDEX) as HTMLElement;

  const click = (name: string) =>
    user.click(getButtons(name)[FIRST_INDEX]);

  return {
    getControl,
    getStatusSelect,
    getButton,
    getNotice: (prefix: string) =>
      screen.getByText(prefix, options),
    queryControl: (label: string) =>
      screen.queryByLabelText(label, options),
    queryButton: (name: string) =>
      getButtons(name).at(FIRST_INDEX) ?? null,
    findButton: (name: string) =>
      screen.findByRole(ARIA_ROLE.BUTTON, { name }),
    findTextMatches: (text: string) =>
      screen.findAllByText(text),
    getStatusOptionLabels: () =>
      Array.from(
        (getStatusSelect() as HTMLSelectElement).options
      ).map((option) => option.textContent),
    getFieldLabels: () =>
      screen
        .getAllByText(/./, { selector: "label" })
        .map((label) =>
          safeString(label.textContent)
            .replace(STRING.ASTERISK, STRING.Empty)
            .trim()
        ),
    getDecommissionCancel,
    fill: async (entries: UnitFormFieldEntry[]) => {
      for (const entry of entries) {
        await typeInto(entry);
      }
    },
    click,
    selectStatus: (status: UnitStatus) =>
      user.selectOptions(getStatusSelect(), status),
    submit: () => click(FORM_SUBMIT_LABEL[mode]),
    openDecommission: () => click(OPEN_BUTTON),
    confirmDecommission: () => click(CONFIRM_BUTTON),
    cancelDecommission: () =>
      user.click(getDecommissionCancel()),
  };
};
