import { redirect } from "next/navigation";
import { PATHS, STRING } from "@/app/constants";
import { readOwnPersonalEmail } from "@/app/services/authentication";
import { submitPersonalEmail } from "./actions/submitPersonalEmail";
import PersonalEmailFormView from "./PersonalEmailFormView";
import { resolvePersonalEmailErrorCopy } from "./utils/resolvePersonalEmailErrorCopy";

const PersonalEmailForm =
  async (): Promise<React.JSX.Element> => {
    const personalEmail = await readOwnPersonalEmail();

    if (!personalEmail) {
      redirect(PATHS.ACCESS.LOGIN);
    }

    const { address, isRequired } = personalEmail;

    return (
      <PersonalEmailFormView
        action={submitPersonalEmail}
        canRemove={!isRequired && address !== null}
        errorCopy={resolvePersonalEmailErrorCopy({
          hasEmail: address !== null,
          isRequired,
        })}
        initialEmail={address ?? STRING.Empty}
      />
    );
  };

export default PersonalEmailForm;
