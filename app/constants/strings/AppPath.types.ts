import type { PATHS } from "./Paths.constants";

type LeafValues<Tree> = Tree extends string
  ? Tree
  : Tree extends object
    ? LeafValues<Tree[keyof Tree]>
    : never;

export type AppPath = LeafValues<typeof PATHS>;
