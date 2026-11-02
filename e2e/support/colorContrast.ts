const HEX_CHANNEL_LENGTH = 2;
const HEX_CHANNEL_STARTS = [1, 3, 5] as const;
const HEX_RADIX = 16;
const SIX_DIGIT_HEX_COLOR_PATTERN = /^#[\da-fA-F]{6}$/;
const CHANNEL_MAX_VALUE = 255;
const SRGB_LINEAR_THRESHOLD = 0.04045;
const SRGB_LINEAR_DIVISOR = 12.92;
const SRGB_GAMMA_OFFSET = 0.055;
const SRGB_GAMMA_SCALE = 1.055;
const SRGB_GAMMA_EXPONENT = 2.4;
const RELATIVE_LUMINANCE_WEIGHTS = [
  0.2126, 0.7152, 0.0722,
] as const;
const CONTRAST_RATIO_OFFSET = 0.05;
const HEX_COLOR_FORMAT_ERROR =
  "Expected a six-digit hexadecimal color.";

const readLinearChannel = (
  color: string,
  startIndex: number
): number => {
  const channelHex = color.slice(
    startIndex,
    startIndex + HEX_CHANNEL_LENGTH
  );
  const channelValue = Number.parseInt(
    channelHex,
    HEX_RADIX
  );

  if (Number.isNaN(channelValue)) {
    throw new Error(HEX_COLOR_FORMAT_ERROR);
  }

  const normalizedChannel =
    channelValue / CHANNEL_MAX_VALUE;
  return normalizedChannel <= SRGB_LINEAR_THRESHOLD
    ? normalizedChannel / SRGB_LINEAR_DIVISOR
    : ((normalizedChannel + SRGB_GAMMA_OFFSET) /
        SRGB_GAMMA_SCALE) **
        SRGB_GAMMA_EXPONENT;
};

const readRelativeLuminance = (color: string): number => {
  if (!SIX_DIGIT_HEX_COLOR_PATTERN.test(color)) {
    throw new Error(HEX_COLOR_FORMAT_ERROR);
  }

  const channels = HEX_CHANNEL_STARTS.map((startIndex) =>
    readLinearChannel(color, startIndex)
  );

  return channels.reduce(
    (total, channel, index) =>
      total + channel * RELATIVE_LUMINANCE_WEIGHTS[index],
    0
  );
};

export const calculateContrastRatio = (
  foreground: string,
  background: string
): number => {
  const luminances = [
    readRelativeLuminance(foreground),
    readRelativeLuminance(background),
  ].sort((first, second) => second - first);

  return (
    (luminances[0] + CONTRAST_RATIO_OFFSET) /
    (luminances[1] + CONTRAST_RATIO_OFFSET)
  );
};
