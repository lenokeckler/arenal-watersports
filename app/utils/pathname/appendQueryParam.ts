import { STRING } from "@/app/constants";

export const appendQueryParam = (
  pathname: string,
  name: string,
  value: string
): string =>
  `${pathname}${STRING.QUESTION_MARK}${new URLSearchParams({ [name]: value }).toString()}`;
