import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  ARIA_ROLE,
  DAMAGE_CAUSE_LABELS,
} from "@/app/constants";
import DamageReportForm from "../components/DamageReportForm";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportScreen } from "../models/DamageReportScreen.interface";
import { NEW_REPORT_SCREEN } from "./DamageReport.constants";

export const createDamageReportFormPage = (
  screenData: DamageReportScreen = NEW_REPORT_SCREEN
) => {
  render(<DamageReportForm screen={screenData} />);

  return {
    press: (name: string): void => {
      fireEvent.click(
        screen.getByRole(ARIA_ROLE.BUTTON, { name })
      );
    },
    chooseCause: (
      cause: keyof typeof DAMAGE_CAUSE_LABELS
    ): void => {
      fireEvent.click(
        screen.getByRole(ARIA_ROLE.RADIO, {
          name: DAMAGE_CAUSE_LABELS[cause],
        })
      );
    },
    describeDamage: (text: string): void => {
      fireEvent.change(
        screen.getByLabelText(
          DAMAGE_REPORT_COPY.DESCRIPTION_LABEL
        ),
        { target: { value: text } }
      );
    },
    queryButton: (name: string) =>
      screen.queryByRole(ARIA_ROLE.BUTTON, { name }),
    queryChoice: (name: string) =>
      screen.queryByRole(ARIA_ROLE.RADIO, { name }),
  };
};
