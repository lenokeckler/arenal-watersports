import ReservationFormView from "./ReservationFormView";
import { loadReservationGuideDirectory } from "./services/loadReservationGuideDirectory";
import { getReservationCategories } from "./services/getReservationCategories";
import { getCostaRicaDate } from "./utils/getCostaRicaDate";

const ReservationForm =
  async (): Promise<React.JSX.Element> => {
    const [categories, guideLoadResult] = await Promise.all(
      [
        getReservationCategories(),
        loadReservationGuideDirectory(),
      ]
    );

    return (
      <ReservationFormView
        categories={categories}
        guideLoadResult={guideLoadResult}
        initialDate={getCostaRicaDate(new Date())}
      />
    );
  };

export default ReservationForm;
