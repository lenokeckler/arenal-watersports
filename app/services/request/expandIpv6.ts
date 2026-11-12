import { ADDRESS_FORMAT } from "@/app/constants";

const toHextetText = (high: string, low: string): string =>
  (
    (Number(high) << ADDRESS_FORMAT.BYTE_BITS) |
    Number(low)
  ).toString(ADDRESS_FORMAT.HEX_RADIX);

const replaceEmbeddedIpv4 = (address: string): string => {
  const match =
    ADDRESS_FORMAT.EMBEDDED_IPV4_PATTERN.exec(address);

  if (!match) {
    return address;
  }

  const [, head, first, second, third, fourth] = match;

  return `${head}${toHextetText(first, second)}${ADDRESS_FORMAT.HEXTET_SEPARATOR}${toHextetText(third, fourth)}`;
};

const splitHextets = (part: string): string[] =>
  part ? part.split(ADDRESS_FORMAT.HEXTET_SEPARATOR) : [];

export const expandIpv6 = (address: string): number[] => {
  const [head, tail] = replaceEmbeddedIpv4(address).split(
    ADDRESS_FORMAT.COMPRESSION
  );
  const headHextets = splitHextets(head);
  const tailHextets = splitHextets(
    tail ?? ADDRESS_FORMAT.NO_TEXT
  );
  const missing =
    ADDRESS_FORMAT.HEXTET_COUNT -
    headHextets.length -
    tailHextets.length;

  return [
    ...headHextets,
    ...Array<string>(missing).fill(
      ADDRESS_FORMAT.ZERO_HEXTET
    ),
    ...tailHextets,
  ].map((hextet) =>
    parseInt(hextet, ADDRESS_FORMAT.HEX_RADIX)
  );
};
