import type { FirstSignInPasswordFieldProps } from "./FirstSignInPasswordFieldProps.interface";

export type FirstSignInSharedFieldProps = Pick<
  FirstSignInPasswordFieldProps,
  "error" | "inputRef" | "isPending" | "onChange" | "value"
>;
