import ReservationFormView from "./ReservationFormView";
import { getReservationCategories } from "./services/getReservationCategories";
import { getCostaRicaDate } from "./utils/getCostaRicaDate";

const ReservationForm =
  async (): Promise<React.JSX.Element> => {
    const categories = await getReservationCategories();

    return (
      <ReservationFormView
        categories={categories}
        initialDate={getCostaRicaDate(new Date())}
      />
    );
  };

export default ReservationForm;
