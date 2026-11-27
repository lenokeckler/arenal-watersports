const INVISIBLE_CHARACTERS =
  "\\s\\u00a0\\u00ad\\u061c\\u1680\\u180e\\u2000-\\u200f\\u2028-\\u202f\\u205f-\\u206f\\u3000\\ufeff";

export const RESERVATION_REFUND_REASON_EDGE_PATTERN =
  new RegExp(
    `^[${INVISIBLE_CHARACTERS}]+|[${INVISIBLE_CHARACTERS}]+$`,
    "gu"
  );

export const RESERVATION_REFUND_REASON_CONTROL_PATTERN =
  /\p{Cc}/u;
