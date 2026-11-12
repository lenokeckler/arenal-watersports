import { WORK_AREA_LABEL } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import type { WorkArea } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { PROFILE_MARK_LABEL } from "../constants/ProfileIdentityCopy.constants";
import type { ProfileIdentity } from "../models/ProfileIdentity.interface";

const labelArea = (area: string): string =>
  WORK_AREA_LABEL[area as WorkArea] ?? area;

export const readOwnProfileIdentity =
  async (): Promise<ProfileIdentity | null> => {
    const supabase = await createServerSupabaseClient();
    const userId = await readSignedInUserId(supabase);

    if (!userId) {
      return null;
    }

    const { data, error } = await supabase
      .from("workers")
      .select(
        "full_name, username, base_role, worker_areas!worker_id(area), worker_marks!worker_id(mark)"
      )
      .eq("id", userId)
      .maybeSingle();

    throwIfSupabaseError(
      error,
      "read the own profile identity"
    );

    if (!data) {
      return null;
    }

    return {
      areas: data.worker_areas.map(({ area }) =>
        labelArea(area)
      ),
      fullName: data.full_name,
      marks: data.worker_marks.map(
        ({ mark }) => PROFILE_MARK_LABEL[mark] ?? mark
      ),
      role: labelArea(data.base_role),
      username: data.username,
    };
  };
