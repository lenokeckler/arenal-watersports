import type { Extra } from "../models/Extra.interface";
import type { ExtraCardViewModel } from "../models/ExtraCardViewModel.interface";
import { resolveExtraEditPath } from "./resolveExtraEditPath";

export const buildExtraCardViewModel = (
  extra: Extra
): ExtraCardViewModel => ({
  editHref: resolveExtraEditPath(extra.id),
  id: extra.id,
  name: extra.name,
  status: extra.status,
});
