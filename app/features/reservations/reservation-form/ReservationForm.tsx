import ReservationFormView from "./ReservationFormView";
import { getReservationCategories } from "./services/getReservationCategories";
import { getReservationGuides } from "./services/getReservationGuides";
import { getCostaRicaDate } from "./utils/getCostaRicaDate";

const ReservationForm =
  async (): Promise<React.JSX.Element> => {
    const [categories, guideOptions] = await Promise.all([
      getReservationCategories(),
      getReservationGuides(),
    ]);

    return (
      <ReservationFormView
        categories={categories}
        guideOptions={guideOptions}
        initialDate={getCostaRicaDate(new Date())}
      />
    );
  };

export default ReservationForm;
