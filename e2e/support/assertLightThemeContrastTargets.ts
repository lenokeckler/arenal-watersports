import { expect } from "@playwright/test";
import {
  E2E_LIGHT_THEME_BORDER_ROLES,
  E2E_LIGHT_THEME_MINIMUM_BORDER_CONTRAST_RATIO,
  E2E_LIGHT_THEME_MINIMUM_CONTRAST_RATIO,
  E2E_LIGHT_THEME_SURFACE_ROLES,
  E2E_LIGHT_THEME_TEXT_ROLES,
} from "../constants/E2eLightTheme.constants";
import { calculateContrastRatio } from "./colorContrast";

export const assertLightThemeContrastTargets = (
  colorTokens: Record<string, string>
): void => {
  for (const textRole of E2E_LIGHT_THEME_TEXT_ROLES) {
    for (const surfaceRole of E2E_LIGHT_THEME_SURFACE_ROLES) {
      expect(
        calculateContrastRatio(
          colorTokens[textRole],
          colorTokens[surfaceRole]
        ),
        `${textRole} on ${surfaceRole}`
      ).toBeGreaterThanOrEqual(
        E2E_LIGHT_THEME_MINIMUM_CONTRAST_RATIO
      );
    }
  }
  for (const borderRole of E2E_LIGHT_THEME_BORDER_ROLES) {
    for (const surfaceRole of E2E_LIGHT_THEME_SURFACE_ROLES) {
      expect(
        calculateContrastRatio(
          colorTokens[borderRole],
          colorTokens[surfaceRole]
        ),
        `${borderRole} on ${surfaceRole}`
      ).toBeGreaterThanOrEqual(
        E2E_LIGHT_THEME_MINIMUM_BORDER_CONTRAST_RATIO
      );
    }
  }
};
