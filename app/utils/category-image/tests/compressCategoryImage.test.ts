import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CATEGORY_IMAGE_COMPRESSION,
  CATEGORY_IMAGE_MIME_TYPE,
} from "@/app/constants";
import { CategoryImageCompressionError } from "../CategoryImageCompressionError";
import { compressCategoryImage } from "../compressCategoryImage";
import type { CategoryImageDimensions } from "../models/CategoryImageDimensions.interface";
import { scaleCategoryImageDimensions } from "../scaleCategoryImageDimensions";
import {
  LANDSCAPE_DIMENSIONS,
  SMALL_DIMENSIONS,
  SOURCE_FILE_NAME,
} from "./categoryImageCompression.constants";

const mockDecode = vi.fn();
const mockEncode = vi.fn();

const PRIMITIVES = {
  decode: mockDecode,
  encode: mockEncode,
};

const SOURCE_FILE = new File(["raw"], SOURCE_FILE_NAME, {
  type: CATEGORY_IMAGE_MIME_TYPE.PNG,
});

const decodeAs = (
  dimensions: CategoryImageDimensions
): void => {
  mockDecode.mockResolvedValue({
    ...dimensions,
    source: document.createElement("canvas"),
  });
};

const blobOf = (mimeType: string): Blob =>
  new Blob(["data"], { type: mimeType });

describe("compressCategoryImage", () => {
  beforeEach(() => {
    mockDecode.mockReset();
    mockEncode.mockReset();
    decodeAs(LANDSCAPE_DIMENSIONS);
  });

  it("encodes webp at the scaled size and returns a webp file", async () => {
    mockEncode.mockResolvedValue(
      blobOf(CATEGORY_IMAGE_MIME_TYPE.WEBP)
    );

    const compressed = await compressCategoryImage(
      SOURCE_FILE,
      PRIMITIVES
    );

    expect(mockEncode).toHaveBeenCalledOnce();
    expect(mockEncode).toHaveBeenCalledWith(
      expect.objectContaining({
        dimensions: scaleCategoryImageDimensions(
          LANDSCAPE_DIMENSIONS
        ),
        mimeType: CATEGORY_IMAGE_MIME_TYPE.WEBP,
        quality: CATEGORY_IMAGE_COMPRESSION.QUALITY,
      })
    );
    expect(compressed.type).toBe(
      CATEGORY_IMAGE_MIME_TYPE.WEBP
    );
    expect(compressed.name).toBe("boat.photo.webp");
  });

  it("falls back to jpeg when the browser cannot encode webp", async () => {
    mockEncode
      .mockResolvedValueOnce(
        blobOf(CATEGORY_IMAGE_MIME_TYPE.PNG)
      )
      .mockResolvedValueOnce(
        blobOf(CATEGORY_IMAGE_MIME_TYPE.JPEG)
      );

    const compressed = await compressCategoryImage(
      SOURCE_FILE,
      PRIMITIVES
    );

    expect(compressed.type).toBe(
      CATEGORY_IMAGE_MIME_TYPE.JPEG
    );
    expect(compressed.name).toBe("boat.photo.jpg");
  });

  it("falls back to jpeg when the encoder returns nothing for webp", async () => {
    mockEncode
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(
        blobOf(CATEGORY_IMAGE_MIME_TYPE.JPEG)
      );

    const compressed = await compressCategoryImage(
      SOURCE_FILE,
      PRIMITIVES
    );

    expect(compressed.type).toBe(
      CATEGORY_IMAGE_MIME_TYPE.JPEG
    );
  });

  it("keeps the original dimensions of an image already small enough", async () => {
    decodeAs(SMALL_DIMENSIONS);
    mockEncode.mockResolvedValue(
      blobOf(CATEGORY_IMAGE_MIME_TYPE.WEBP)
    );

    await compressCategoryImage(SOURCE_FILE, PRIMITIVES);

    expect(mockEncode).toHaveBeenCalledWith(
      expect.objectContaining({
        dimensions: SMALL_DIMENSIONS,
      })
    );
  });

  it("throws when no preferred format can be encoded", async () => {
    mockEncode.mockResolvedValue(null);

    await expect(
      compressCategoryImage(SOURCE_FILE, PRIMITIVES)
    ).rejects.toThrow(CategoryImageCompressionError);
    expect(mockEncode).toHaveBeenCalledTimes(
      CATEGORY_IMAGE_COMPRESSION.PREFERRED_MIME_TYPES.length
    );
  });

  it("propagates a decode failure", async () => {
    mockDecode.mockRejectedValue(new Error("corrupt"));

    await expect(
      compressCategoryImage(SOURCE_FILE, PRIMITIVES)
    ).rejects.toThrow("corrupt");
    expect(mockEncode).not.toHaveBeenCalled();
  });
});
