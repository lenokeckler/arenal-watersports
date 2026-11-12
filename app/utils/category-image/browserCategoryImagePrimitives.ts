import type { CategoryImageCompressionPrimitives } from "./models/CategoryImageCompressionPrimitives.interface";

const CANVAS_TAG = "canvas";
const CANVAS_CONTEXT = "2d";
const DRAW_ORIGIN = 0;

export const browserCategoryImagePrimitives: CategoryImageCompressionPrimitives =
  {
    decode: async (file) => {
      const bitmap = await createImageBitmap(file);

      return {
        height: bitmap.height,
        source: bitmap,
        width: bitmap.width,
      };
    },
    encode: ({ decoded, dimensions, mimeType, quality }) =>
      new Promise((resolve) => {
        const canvas = document.createElement(CANVAS_TAG);
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        const context = canvas.getContext(CANVAS_CONTEXT);
        if (!context) {
          resolve(null);
          return;
        }

        context.drawImage(
          decoded.source,
          DRAW_ORIGIN,
          DRAW_ORIGIN,
          dimensions.width,
          dimensions.height
        );
        canvas.toBlob(resolve, mimeType, quality);
      }),
  };
