export const SECTION_ID = {
  ABOUT: "about",
  CONTACT: "contact",
  CONTACT_INPUTS: "contact-inputs",
  HERO_SECTION: "hero-heading",
} as const;

export type SectionId =
  (typeof SECTION_ID)[keyof typeof SECTION_ID];
