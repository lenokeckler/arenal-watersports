import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import ComboListView from "./ComboListView";
import type { ComboListViewProps } from "./models/ComboListViewProps.interface";
import { listCombos } from "./services/listCombos";

const fetchComboListViewProps =
  async (): Promise<ComboListViewProps> => {
    try {
      return {
        combos: await listCombos(),
        fetchFailed: false,
      };
    } catch {
      return { combos: [], fetchFailed: true };
    }
  };

const ComboList = async (): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const comboListViewProps =
    await fetchComboListViewProps();

  return <ComboListView {...comboListViewProps} />;
};

export default ComboList;
