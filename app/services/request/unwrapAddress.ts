import { ADDRESS_FORMAT } from "@/app/constants";

export const unwrapAddress = (
  candidate: string
): string => {
  const bracketed =
    ADDRESS_FORMAT.BRACKETED_PATTERN.exec(candidate);
  const withPort =
    ADDRESS_FORMAT.IPV4_WITH_PORT_PATTERN.exec(candidate);
  const bare = bracketed?.[1] ?? withPort?.[1] ?? candidate;

  return bare.replace(
    ADDRESS_FORMAT.ZONE_PATTERN,
    ADDRESS_FORMAT.NO_TEXT
  );
};
