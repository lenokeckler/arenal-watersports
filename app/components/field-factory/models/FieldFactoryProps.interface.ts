import { OMITTED_PROPS } from "@/app/constants";
import { FormFieldProps } from "../../form-field/models/FormFieldProps.interface";
import {
  NullableUndefined,
  NullableRef,
} from "@/app/types";
import { RefObject } from "react";

export interface FieldFactoryProps extends Omit<
  FormFieldProps,
  (typeof OMITTED_PROPS)[keyof typeof OMITTED_PROPS]
> {
  baseClassName: string;
  handleChange: (
    _event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  readOnly?: boolean;
  disabled?: boolean;
  selectSizeClassName?: string;
  onKeyDown?: (
    _event: React.KeyboardEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  onSearch?: NullableUndefined<(_value: string) => void>;
  reference?: RefObject<NullableRef<HTMLInputElement>>;
  isSearch?: boolean;
  accept?: string;
}
