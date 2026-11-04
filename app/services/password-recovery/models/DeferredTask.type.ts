export type DeferredTask = (
  task: () => Promise<void>
) => void;
