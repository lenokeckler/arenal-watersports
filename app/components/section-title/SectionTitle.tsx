import Title from "@/app/components/title/Title";
import SectionTitleProps from "./SectionTitleProps.interface";
import { STRING, TitleVariant } from "@/app/constants";
import { resolveSectionTitleClassName } from "./styles/SectionTitle.styles";

const SectionTitle = ({
  className = STRING.Empty,
  text,
}: SectionTitleProps) => (
  <Title
    variant={TitleVariant.SECONDARY}
    className={resolveSectionTitleClassName(className)}
    text={text}
  />
);

export default SectionTitle;
