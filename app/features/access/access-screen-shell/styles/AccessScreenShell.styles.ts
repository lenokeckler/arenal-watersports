export const ACCESS_SHELL_PAGE_CLASS =
  "relative min-h-dvh overflow-x-hidden bg-background";

export const ACCESS_SHELL_BACKDROP_CLASS =
  "pointer-events-none absolute inset-0 overflow-hidden group-has-[[data-layout-wide]]:hidden";

export const ACCESS_SHELL_BLOB_PRIMARY_CLASS =
  "absolute -top-1/5 -left-1/10 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl";

export const ACCESS_SHELL_BLOB_TERTIARY_CLASS =
  "absolute -bottom-1/5 -right-1/10 h-2/5 w-2/5 rounded-full bg-tertiary-container/10 blur-3xl";

export const ACCESS_SHELL_CONTENT_CLASS =
  "relative z-10 flex min-h-dvh items-center justify-center p-margin-mobile md:p-margin-desktop";

export const ACCESS_SHELL_WIDE_CARD_CLASS =
  "has-[[data-layout-wide]]:max-w-4xl has-[[data-layout-wide]]:border-transparent has-[[data-layout-wide]]:bg-transparent has-[[data-layout-wide]]:p-0 has-[[data-layout-wide]]:shadow-none has-[[data-layout-wide]]:backdrop-blur-none md:has-[[data-layout-wide]]:p-0 md:has-[[data-layout-wide]]:shadow-none";

export const ACCESS_SHELL_CARD_CLASS = `flex w-full max-w-form flex-col gap-md rounded-xl border border-outline-variant bg-surface-container/70 p-md shadow-xl backdrop-blur-md md:gap-lg md:p-lg md:shadow-2xl ${ACCESS_SHELL_WIDE_CARD_CLASS}`;

export const ACCESS_SHELL_EMBEDDED_PAGE_CLASS =
  "group relative flex flex-1 flex-col overflow-x-hidden bg-background";

export const ACCESS_SHELL_EMBEDDED_CONTENT_CLASS =
  "relative z-10 flex flex-1 items-center justify-center p-margin-mobile has-[[data-layout-wide]]:items-start md:p-margin-desktop";

export const resolveAccessShellPageClassName = (
  isEmbedded: boolean
): string =>
  isEmbedded
    ? ACCESS_SHELL_EMBEDDED_PAGE_CLASS
    : ACCESS_SHELL_PAGE_CLASS;

export const resolveAccessShellContentClassName = (
  isEmbedded: boolean
): string =>
  isEmbedded
    ? ACCESS_SHELL_EMBEDDED_CONTENT_CLASS
    : ACCESS_SHELL_CONTENT_CLASS;
