import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import CategoryImageForm from "./CategoryImageForm";
import type { CategoryImageProps } from "./models/CategoryImageProps.interface";
import { getCategoryImage } from "./services/getCategoryImage";

const CategoryImage = async ({
  categoryId,
}: CategoryImageProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const image = await getCategoryImage(categoryId);

  if (!image) {
    notFound();
  }

  return <CategoryImageForm image={image} />;
};

export default CategoryImage;
