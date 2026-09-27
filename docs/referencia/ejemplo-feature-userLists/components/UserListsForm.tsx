import { JSX } from "react";
import Button from "@/app/components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import {
  BUTTON,
  BUTTON_TYPES,
  STRING,
} from "@/app/constants";
import {
  USER_LISTS_COPY,
  USER_LISTS_ELEMENT_ID,
  USER_LISTS_FIELD_NAME,
} from "../constants/UserLists.constants";
import { UserListsFormProps } from "../models/UserListsFormProps.interface";
import {
  USER_LISTS_FORM_CLASS,
  USER_LISTS_FORM_FIELD_CLASS,
  USER_LISTS_FORM_FIELD_WRAPPER_CLASS,
  USER_LISTS_FORM_SUBMIT_BUTTON_CLASS,
} from "../styles/UserListsForm.styles";

const UserListsForm = ({
  errorMessage,
  onSubmit,
  onUsernameChange,
  username,
}: UserListsFormProps): JSX.Element => (
  <form
    className={USER_LISTS_FORM_CLASS}
    onSubmit={onSubmit}
  >
    <div className={USER_LISTS_FORM_FIELD_WRAPPER_CLASS}>
      <FormField
        id={USER_LISTS_ELEMENT_ID.USERNAME_FIELD}
        name={USER_LISTS_FIELD_NAME.USERNAME}
        label={USER_LISTS_COPY.USERNAME_LABEL}
        value={username}
        placeholder={USER_LISTS_COPY.USERNAME_PLACEHOLDER}
        labelSuffix={STRING.Empty}
        classNameField={USER_LISTS_FORM_FIELD_CLASS}
        error={errorMessage}
        showErrorText
        onChange={onUsernameChange}
      />
    </div>
    <Button
      type={BUTTON_TYPES.SUBMIT}
      variant={BUTTON.BASE}
      className={USER_LISTS_FORM_SUBMIT_BUTTON_CLASS}
    >
      {USER_LISTS_COPY.ADD_BUTTON}
    </Button>
  </form>
);

export default UserListsForm;
