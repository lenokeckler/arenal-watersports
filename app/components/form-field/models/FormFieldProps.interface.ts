import { INPUT_TYPES } from "@/app/constants";
import { Nullable, NullableRef } from "@/app/types";
import { RefObject } from "react";

export interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value?: string;
  type?: (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES];
  options?: Nullable<
    Array<{
      key: string;
      value: string;
      label: string;
    }>
  >;
  checked?: boolean;
  placeholder?: string;
  classNameField?: string;
  onChange: (
    _event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  onKeyDown?: (
    _event: React.KeyboardEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  error?: string;
  showErrorText?: boolean;
  labelSuffix?: string;
  readOnly?: boolean;
  disabled?: boolean;
  selectSizeClassName?: string;
  preventEnterSubmit?: boolean;
  accept?: string;
  onSearch?: (_value: string) => void;
  reference?: RefObject<NullableRef<HTMLInputElement>>;
  isSearch?: boolean;
}
