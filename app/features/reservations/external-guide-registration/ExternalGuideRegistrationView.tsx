"use client";

import { useState } from "react";
import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import { EXTERNAL_GUIDE_REGISTRATION_COPY } from "./constants/ExternalGuideRegistrationCopy.constants";
import { EXTERNAL_GUIDE_REGISTRATION_ELEMENT } from "./constants/ExternalGuideRegistrationElement.constants";
import ExternalGuideRegistrationForm from "./components/ExternalGuideRegistrationForm";
import type { ExternalGuideRegistrationViewProps } from "./models/ExternalGuideRegistrationViewProps.interface";
import {
  EXTERNAL_GUIDE_REGISTRATION_CONTENT_CLASS,
  EXTERNAL_GUIDE_REGISTRATION_SCREEN_CLASS,
} from "./styles/ExternalGuideRegistration.styles";

const ExternalGuideRegistrationView = ({
  action,
}: ExternalGuideRegistrationViewProps): React.JSX.Element => {
  const [formRound, setFormRound] = useState(0);

  return (
    <main
      className={EXTERNAL_GUIDE_REGISTRATION_SCREEN_CLASS}
    >
      <div
        className={
          EXTERNAL_GUIDE_REGISTRATION_CONTENT_CLASS
        }
      >
        <ScreenHeading
          title={EXTERNAL_GUIDE_REGISTRATION_COPY.HEADING}
          titleId={
            EXTERNAL_GUIDE_REGISTRATION_ELEMENT.TITLE_ID
          }
          hasLogo={false}
          instruction={
            EXTERNAL_GUIDE_REGISTRATION_COPY.INSTRUCTION
          }
        />
        <ExternalGuideRegistrationForm
          key={formRound}
          action={action}
          onRegisterAnother={() =>
            setFormRound((round) => round + 1)
          }
        />
      </div>
    </main>
  );
};

export default ExternalGuideRegistrationView;
