import type { Locator, Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_PROFILE_COPY } from "../constants/E2eProfile.constants";
import {
  E2E_HALF,
  E2E_REGION_ROLE,
  E2E_SYSTEM_FRAME_OPERATION,
} from "../constants/E2eSystemFrame.constants";
import { failE2eOperation } from "../support/failE2eOperation";
import type { ScrollMetrics } from "../support/models/ScrollMetrics.interface";

export const createSystemFramePage = (page: Page) => {
  const getProfileCard = (): Locator =>
    page.getByRole(E2E_REGION_ROLE, {
      name: E2E_PROFILE_COPY.PROFILE_HEADING,
    });

  const goToHome = async (): Promise<void> => {
    await page.goto(PATHS.HOME);
  };

  const goToProfile = async (): Promise<void> => {
    await page.goto(PATHS.PROFILE.ROOT);
  };

  const readScrollMetrics = (): Promise<ScrollMetrics> =>
    page.evaluate(() => ({
      documentHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
    }));

  const readProfileCardCentreOffset =
    async (): Promise<number> => {
      const box = await getProfileCard().boundingBox();
      const viewport = page.viewportSize();
      if (!box || !viewport) {
        return failE2eOperation(
          E2E_SYSTEM_FRAME_OPERATION.MEASURE_CARD,
          E2E_SYSTEM_FRAME_OPERATION.NOT_LAID_OUT
        );
      }
      return Math.abs(
        box.x +
          box.width * E2E_HALF -
          viewport.width * E2E_HALF
      );
    };

  return {
    getProfileCard,
    goToHome,
    goToProfile,
    readScrollMetrics,
    readProfileCardCentreOffset,
  };
};
