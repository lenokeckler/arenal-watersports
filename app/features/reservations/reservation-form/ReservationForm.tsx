import ReservationFormView from "./ReservationFormView";
import { loadReservationGuideDirectory } from "./services/loadReservationGuideDirectory";
import { getReservationCategories } from "./services/getReservationCategories";
import { getCostaRicaDate } from "./utils/getCostaRicaDate";
import { getPredefinedReservationCombos } from "./services/getPredefinedReservationCombos";

const ReservationForm =
  async (): Promise<React.JSX.Element> => {
    const [categories, guideLoadResult, predefinedCombos] =
      await Promise.all([
        getReservationCategories(),
        loadReservationGuideDirectory(),
        getPredefinedReservationCombos(),
      ]);

    return (
      <ReservationFormView
        categories={categories}
        guideLoadResult={guideLoadResult}
        initialDate={getCostaRicaDate(new Date())}
        predefinedCombos={predefinedCombos}
      />
    );
  };

export default ReservationForm;
