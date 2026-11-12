import { isIP } from "node:net";
import {
  ADDRESS_FORMAT,
  IP_VERSION,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { expandIpv6 } from "./expandIpv6";
import { unwrapAddress } from "./unwrapAddress";

const isIpv4Mapped = (hextets: number[]): boolean =>
  hextets
    .slice(0, ADDRESS_FORMAT.MAPPED_ZERO_HEXTETS)
    .every((hextet) => hextet === 0) &&
  hextets[ADDRESS_FORMAT.MAPPED_MARKER_INDEX] ===
    ADDRESS_FORMAT.MAPPED_MARKER;

const splitBytes = (hextet: number): number[] => [
  hextet >> ADDRESS_FORMAT.BYTE_BITS,
  hextet & ADDRESS_FORMAT.BYTE_MASK,
];

const formatMappedIpv4 = (hextets: number[]): string =>
  hextets
    .slice(ADDRESS_FORMAT.MAPPED_MARKER_INDEX + 1)
    .flatMap(splitBytes)
    .join(ADDRESS_FORMAT.IPV4_SEPARATOR);

const formatPrefix = (hextets: number[]): string =>
  hextets
    .slice(0, ADDRESS_FORMAT.PREFIX_HEXTETS)
    .map((hextet) =>
      hextet.toString(ADDRESS_FORMAT.HEX_RADIX)
    )
    .join(ADDRESS_FORMAT.HEXTET_SEPARATOR) +
  ADDRESS_FORMAT.COMPRESSION;

export const canonicalizeClientAddress = (
  candidate: string
): NullableRef<string> => {
  const address = unwrapAddress(candidate);
  const version = isIP(address);

  if (version === IP_VERSION.V4) {
    return address;
  }

  if (version !== IP_VERSION.V6) {
    return null;
  }

  const hextets = expandIpv6(address);

  return isIpv4Mapped(hextets)
    ? formatMappedIpv4(hextets)
    : formatPrefix(hextets);
};
