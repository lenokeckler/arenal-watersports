import ReservationFormView from "./ReservationFormView";
import { loadReservationGuideDirectory } from "./services/loadReservationGuideDirectory";
import { getReservationCategories } from "./services/getReservationCategories";
import { getReservationUnitCategories } from "./services/getReservationUnitCategories";
import { getCostaRicaDate } from "./utils/getCostaRicaDate";

const ReservationForm =
  async (): Promise<React.JSX.Element> => {
    const [categories, unitCategories, guideLoadResult] =
      await Promise.all([
        getReservationCategories(),
        getReservationUnitCategories(),
        loadReservationGuideDirectory(),
      ]);

    return (
      <ReservationFormView
        categories={categories}
        unitCategories={unitCategories}
        guideLoadResult={guideLoadResult}
        initialDate={getCostaRicaDate(new Date())}
      />
    );
  };

export default ReservationForm;
