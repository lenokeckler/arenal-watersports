import type { Nullable } from "@/app/types";

export interface FormFieldViewModel {
  value: string;
  type?: string;
  error?: Nullable<string>;
  classNameField?: string;
  onChange: (
    _event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  readOnly?: boolean;
  disabled?: boolean;
  selectSizeClassName?: string;
  preventEnterSubmit?: boolean;
}
