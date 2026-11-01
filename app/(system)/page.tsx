import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";

const HomePage = (): never => redirect(PATHS.BOARD);

export default HomePage;
