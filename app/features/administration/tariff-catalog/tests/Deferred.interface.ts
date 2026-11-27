export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
}
