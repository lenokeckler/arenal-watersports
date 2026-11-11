import type { NextResponse } from "next/server";
import type { SessionAccess } from "./SessionAccess.interface";

export interface SessionRefresh extends SessionAccess {
  response: NextResponse;
}
