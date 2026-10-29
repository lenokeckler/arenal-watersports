import type { NextResponse } from "next/server";

export interface SessionRefresh {
  hasSession: boolean;
  response: NextResponse;
}
