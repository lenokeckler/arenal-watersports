import { redirect } from "next/navigation";
import { resolveExtraCompatibilityPath } from "@/app/features/administration/extra-catalog/utils/resolveExtraCompatibilityPath";

const ExtraCompatibilityUnitsPage = async ({
  params,
}: PageProps<"/administration/extras/[extraId]/compatibility/[categoryId]">): Promise<never> => {
  const { extraId } = await params;

  redirect(resolveExtraCompatibilityPath(extraId));
};

export default ExtraCompatibilityUnitsPage;
