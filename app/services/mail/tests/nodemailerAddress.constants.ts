export const LEGITIMATE_DOMAIN_SUFFIXES = [
  "@victim.com",
  "@good.com",
] as const;

export const DISGUISED_RECIPIENTS = [
  "Victim (x(y) <evil@evil.com>) <v@victim.com>",
  "G: (a; <evil@evil.com>) <v@victim.com>;",
  `<${JSON.stringify("a@evil.com>")}@good.com>`,
] as const;
