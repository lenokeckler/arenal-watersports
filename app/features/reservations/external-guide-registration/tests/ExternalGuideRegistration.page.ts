import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { EXTERNAL_GUIDE_REGISTRATION_COPY } from "../constants/ExternalGuideRegistrationCopy.constants";

export const createExternalGuideRegistrationPage = () => ({
  getHeading: () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: EXTERNAL_GUIDE_REGISTRATION_COPY.HEADING,
    }),
  getFullNameField: () =>
    screen.getByLabelText(
      new RegExp(EXTERNAL_GUIDE_REGISTRATION_COPY.FULL_NAME)
    ),
  getNationalIdField: () =>
    screen.getByLabelText(
      new RegExp(
        EXTERNAL_GUIDE_REGISTRATION_COPY.NATIONAL_ID
      )
    ),
  getExpiryField: () =>
    screen.getByLabelText(
      new RegExp(
        EXTERNAL_GUIDE_REGISTRATION_COPY.EXPIRES_ON
      )
    ),
  getOptionalEmailField: () =>
    screen.getByLabelText(
      EXTERNAL_GUIDE_REGISTRATION_COPY.PERSONAL_EMAIL
    ),
  getSubmitButton: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTERNAL_GUIDE_REGISTRATION_COPY.SUBMIT,
    }),
});
