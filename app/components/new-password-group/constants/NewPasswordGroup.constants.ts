import { PASSWORD_RULES_ID_SUFFIX } from "@/app/components/password-rules-checklist/constants/PasswordRulesIds.constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";

export const NEW_PASSWORD_GROUP_RULES_ID = `${PASSWORD_CHANGE_FIELD.NEW_PASSWORD}-rules`;

export const NEW_PASSWORD_GROUP_RULES_TITLE_ID = `${NEW_PASSWORD_GROUP_RULES_ID}${PASSWORD_RULES_ID_SUFFIX.TITLE}`;

export const NEW_PASSWORD_GROUP_DESCRIBED_BY = `${NEW_PASSWORD_GROUP_RULES_TITLE_ID} ${NEW_PASSWORD_GROUP_RULES_ID}`;
