import { render } from "@testing-library/react";
import { vi } from "vitest";
import { readOwnPersonalEmail } from "@/app/services/authentication";
import type { NullableUndefined } from "@/app/types";
import ProfileHub from "../ProfileHub";
import {
  READ_FAILURE,
  REGISTERED_STATE,
} from "./ProfileHub.constants";

export const renderProfileHub = async (
  notice: NullableUndefined<string | string[]> = undefined,
  state: Awaited<
    ReturnType<typeof readOwnPersonalEmail>
  > = REGISTERED_STATE
) => {
  vi.mocked(readOwnPersonalEmail).mockResolvedValue(state);

  return render(await ProfileHub({ notice }));
};

export const renderProfileHubWithFailedRead = async () => {
  vi.mocked(readOwnPersonalEmail).mockRejectedValue(
    READ_FAILURE
  );

  return render(await ProfileHub({ notice: undefined }));
};
