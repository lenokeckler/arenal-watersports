import { PASSWORD_RULES_ID_SUFFIX } from "@/app/components/password-rules-checklist/constants/PasswordRulesIds.constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";

export const PASSWORD_CHANGE_RULES_ID = `${PASSWORD_CHANGE_FIELD.NEW_PASSWORD}-rules`;

export const PASSWORD_CHANGE_RULES_TITLE_ID = `${PASSWORD_CHANGE_RULES_ID}${PASSWORD_RULES_ID_SUFFIX.TITLE}`;

export const PASSWORD_CHANGE_NEW_PASSWORD_DESCRIBED_BY = `${PASSWORD_CHANGE_RULES_TITLE_ID} ${PASSWORD_CHANGE_RULES_ID}`;
