import Title from "@/app/components/title/Title";
import WorkModeGate from "@/app/features/access/work-mode/WorkModeGate";
import { APP_NAME, TitleVariant } from "@/app/constants";
import { HOME_PAGE_CLASS } from "@/app/styles/HomePage.styles";

const HomePage = (): React.JSX.Element => (
  <main className={HOME_PAGE_CLASS}>
    <WorkModeGate />
    <Title
      variant={TitleVariant.PRIMARY}
      text={APP_NAME.LABEL}
    />
  </main>
);

export default HomePage;
