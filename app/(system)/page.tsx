import Title from "@/app/components/title/Title";
import { APP_NAME, TitleVariant } from "@/app/constants";
import { HOME_PAGE_CLASS } from "@/app/styles/HomePage.styles";

export default function Home() {
  return (
    <main className={HOME_PAGE_CLASS}>
      <Title
        variant={TitleVariant.PRIMARY}
        text={APP_NAME.LABEL}
      />
    </main>
  );
}
