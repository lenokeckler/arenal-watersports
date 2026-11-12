import { resolveCategoryImageUrl } from "@/app/utils/category-image/resolveCategoryImageUrl";
import type { CategoryImage } from "../models/CategoryImage.interface";
import type { CategoryImageRow } from "../models/CategoryImageRow.type";

export const mapCategoryRowToImage = (
  categoryRow: CategoryImageRow
): CategoryImage => ({
  categoryId: categoryRow.id,
  categoryName: categoryRow.name,
  imagePath: categoryRow.image_path,
  imageUrl: resolveCategoryImageUrl(categoryRow.image_path),
});
