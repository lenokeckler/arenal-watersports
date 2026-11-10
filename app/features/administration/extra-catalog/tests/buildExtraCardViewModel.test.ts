import { describe, expect, it } from "vitest";
import { buildExtraCardViewModel } from "../utils/buildExtraCardViewModel";
import { resolveExtraEditPath } from "../utils/resolveExtraEditPath";
import { DEFAULT_EXTRA } from "./Extra.constants";

describe("buildExtraCardViewModel", () => {
  it("carries the extra and points the edit link at its edit path", () => {
    expect(buildExtraCardViewModel(DEFAULT_EXTRA)).toEqual({
      editHref: resolveExtraEditPath(DEFAULT_EXTRA.id),
      id: DEFAULT_EXTRA.id,
      name: DEFAULT_EXTRA.name,
      status: DEFAULT_EXTRA.status,
    });
  });
});
