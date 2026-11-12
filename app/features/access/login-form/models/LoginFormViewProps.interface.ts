import type { NullableRef } from "@/app/types";
import type { LoginFormOptions } from "./LoginFormOptions.interface";

export interface LoginFormViewProps extends LoginFormOptions {
  noticeMessage: NullableRef<string>;
}
