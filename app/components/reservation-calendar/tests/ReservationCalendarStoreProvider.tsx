import type {
  PropsWithChildren,
  ReactElement,
} from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";

export const ReservationCalendarStoreProvider = ({
  children,
}: PropsWithChildren): ReactElement => (
  <Provider store={store}>{children}</Provider>
);
