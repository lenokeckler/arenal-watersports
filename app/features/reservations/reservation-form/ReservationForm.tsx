import ReservationFormView from "./ReservationFormView";
import { getReservationCategories } from "./services/getReservationCategories";
import { getReservationUnitCategories } from "./services/getReservationUnitCategories";
import { getCostaRicaDate } from "./utils/getCostaRicaDate";

const ReservationForm =
  async (): Promise<React.JSX.Element> => {
    const [categories, unitCategories] = await Promise.all([
      getReservationCategories(),
      getReservationUnitCategories(),
    ]);

    return (
      <ReservationFormView
        categories={categories}
        unitCategories={unitCategories}
        initialDate={getCostaRicaDate(new Date())}
      />
    );
  };

export default ReservationForm;
