import { STRING } from "@/app/constants";

export const readTextField = (
  formData: FormData,
  field: string
): string => {
  const value = formData.get(field);
  return typeof value === "string" ? value : STRING.Empty;
};
