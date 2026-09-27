import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

const ignoreIntersectionObserverCall = (): void =>
  undefined;

class NoopIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = ignoreIntersectionObserverCall;
  unobserve = ignoreIntersectionObserverCall;
  disconnect = ignoreIntersectionObserverCall;
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (typeof window !== "undefined") {
  window.IntersectionObserver ??=
    NoopIntersectionObserver as unknown as typeof IntersectionObserver;
}

afterEach(() => {
  cleanup();
});
