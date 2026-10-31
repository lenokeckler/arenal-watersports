import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import type { DepositsSectionProps } from "./models/DepositsSectionProps.interface";
import {
  DEPOSITS_REPORT_HEADING_CLASS,
  DEPOSITS_REPORT_HELP_CLASS,
  DEPOSITS_REPORT_SECTION_CLASS,
} from "./styles/DepositsReport.styles";

const DepositsSection = ({
  headingId,
  heading,
  help,
  children,
}: DepositsSectionProps): React.JSX.Element => (
  <Section
    ariaLabel={headingId}
    className={DEPOSITS_REPORT_SECTION_CLASS}
  >
    <Title
      id={headingId}
      variant={TitleVariant.SECONDARY}
      text={heading}
      className={DEPOSITS_REPORT_HEADING_CLASS}
    />
    <Text className={DEPOSITS_REPORT_HELP_CLASS}>
      {help}
    </Text>
    {children}
  </Section>
);

export default DepositsSection;
