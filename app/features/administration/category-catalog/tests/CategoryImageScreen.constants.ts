import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryImage } from "../models/CategoryImage.interface";
import type { CategoryImageMutationResult } from "../models/CategoryImageMutationResult.type";
import {
  CURRENT_IMAGE_PATH,
  IMAGE_CATEGORY_ID,
  NEW_IMAGE_PATH,
} from "./CategoryImage.constants";

export const SAVED_IMAGE_URL = `https://storage.example.test/category-images/${CURRENT_IMAGE_PATH}`;

export const PICKED_PREVIEW_URL =
  "blob:http://localhost/picked-preview";

export const CATEGORY_NAME = "Kayak doble";

export const EMPTY_CATEGORY_IMAGE: CategoryImage = {
  categoryId: IMAGE_CATEGORY_ID,
  categoryName: CATEGORY_NAME,
  imagePath: null,
  imageUrl: null,
};

export const SAVED_CATEGORY_IMAGE: CategoryImage = {
  ...EMPTY_CATEGORY_IMAGE,
  imagePath: CURRENT_IMAGE_PATH,
  imageUrl: SAVED_IMAGE_URL,
};

export const SET_SUCCESS_RESULT: CategoryImageMutationResult =
  {
    hasLeftoverObject: false,
    status: CATEGORY_MUTATION_STATUS.SUCCESS,
  };

export const SET_LEFTOVER_RESULT: CategoryImageMutationResult =
  {
    hasLeftoverObject: true,
    status: CATEGORY_MUTATION_STATUS.SUCCESS,
  };

export const ACTION_ERROR_MESSAGE =
  "The action refused the image";

export const SET_ERROR_RESULT: CategoryImageMutationResult =
  {
    message: ACTION_ERROR_MESSAGE,
    status: CATEGORY_MUTATION_STATUS.ERROR,
  };

export const UPLOAD_ERROR_MESSAGE = "upload refused";

export const UPLOADED_IMAGE = { imagePath: NEW_IMAGE_PATH };

export const UPLOAD_FAILURE = {
  message: UPLOAD_ERROR_MESSAGE,
};

export const BROWSER_SUPABASE_CLIENT = {
  storage: {},
};
