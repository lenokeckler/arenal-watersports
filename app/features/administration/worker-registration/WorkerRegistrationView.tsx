"use client";

import { useState } from "react";
import WorkerRegistrationForm from "./components/WorkerRegistrationForm";
import WorkerRegistrationHeading from "./components/WorkerRegistrationHeading";
import type { WorkerRegistrationViewProps } from "./models/WorkerRegistrationViewProps.interface";

const WorkerRegistrationView = ({
  action,
}: WorkerRegistrationViewProps): React.JSX.Element => {
  const [formRound, setFormRound] = useState(0);

  return (
    <>
      <WorkerRegistrationHeading />
      <WorkerRegistrationForm
        key={formRound}
        action={action}
        onRegisterAnother={() =>
          setFormRound((round) => round + 1)
        }
      />
    </>
  );
};

export default WorkerRegistrationView;
