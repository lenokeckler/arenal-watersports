import { STRING } from "@/app/constants";

export const appendQueryParam = (
  pathname: string,
  name: string,
  value: string
): string => {
  const fragmentStart = pathname.indexOf(STRING.HASH);
  const hasFragment = fragmentStart !== -1;
  const path = hasFragment
    ? pathname.slice(0, fragmentStart)
    : pathname;
  const fragment = hasFragment
    ? pathname.slice(fragmentStart)
    : STRING.Empty;
  const query = new URLSearchParams({
    [name]: value,
  }).toString();
  const separator = path.includes(STRING.QUESTION_MARK)
    ? STRING.AMPERSAND
    : STRING.QUESTION_MARK;

  return `${path}${separator}${query}${fragment}`;
};
