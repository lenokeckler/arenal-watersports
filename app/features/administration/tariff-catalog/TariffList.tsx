import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import type { TariffListViewProps } from "./models/TariffListViewProps.interface";
import { listTariffs } from "./services/listTariffs";
import TariffListView from "./TariffListView";

const fetchTariffListViewProps =
  async (): Promise<TariffListViewProps> => {
    try {
      return {
        categories: await listTariffs(),
        fetchFailed: false,
      };
    } catch {
      return { categories: [], fetchFailed: true };
    }
  };

const TariffList = async (): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const tariffListViewProps =
    await fetchTariffListViewProps();

  return <TariffListView {...tariffListViewProps} />;
};

export default TariffList;
