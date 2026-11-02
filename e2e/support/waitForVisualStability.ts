import type { Page } from "@playwright/test";

export const waitForVisualStability = async (
  page: Page
): Promise<void> => {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const finiteAnimations = document
      .getAnimations()
      .filter(
        (animation) =>
          animation.effect?.getComputedTiming()
            .iterations !== Infinity
      );
    await Promise.all(
      finiteAnimations.map((animation) =>
        animation.finished.catch(() => undefined)
      )
    );
  });
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => resolve())
        );
      })
  );
};
