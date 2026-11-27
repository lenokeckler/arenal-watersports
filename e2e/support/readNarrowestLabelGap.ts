import type { Locator } from "@playwright/test";

export const readNarrowestLabelGap = (
  navigation: Locator
): Promise<number> =>
  navigation.evaluate((element) => {
    const labels = [
      ...element.querySelectorAll(
        "a span:last-of-type, button span:last-of-type"
      ),
    ].map((label) => label.getBoundingClientRect());

    return Math.min(
      ...labels
        .slice(1)
        .map(
          (label, index) => label.left - labels[index].right
        )
    );
  });
