import { redirect } from "next/navigation";
import ListPagination from "@/app/components/list-pagination/ListPagination";
import { Text, Title } from "@/app/components";
import {
  ARIA_ROLE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import EquipmentHoursCategorySection from "./components/EquipmentHoursCategorySection";
import { EQUIPMENT_HOURS_COPY } from "./constants/EquipmentHoursReportCopy.constants";
import type { EquipmentHoursPage } from "./models/EquipmentHoursPage.interface";
import type { EquipmentHoursReportProps } from "./models/EquipmentHoursReportProps.interface";
import {
  EquipmentHoursAccessError,
  getEquipmentHours,
} from "./services/getEquipmentHours";
import {
  EQUIPMENT_HOURS_ERROR_CLASS,
  EQUIPMENT_HOURS_HEADING_CLASS,
  EQUIPMENT_HOURS_NOTE_CLASS,
  EQUIPMENT_HOURS_PAGE_CLASS,
} from "./styles/EquipmentHoursReport.styles";

const EquipmentHoursReport = async ({
  page,
}: EquipmentHoursReportProps): Promise<React.JSX.Element> => {
  let result: EquipmentHoursPage | null = null;

  try {
    result = await getEquipmentHours(page);
  } catch (error) {
    if (error instanceof EquipmentHoursAccessError) {
      redirect(PATHS.HOME);
    }
  }

  return (
    <main className={EQUIPMENT_HOURS_PAGE_CLASS}>
      <Title
        variant={TitleVariant.PRIMARY}
        text={EQUIPMENT_HOURS_COPY.HEADING}
        className={EQUIPMENT_HOURS_HEADING_CLASS}
      />
      <Text className={EQUIPMENT_HOURS_NOTE_CLASS}>
        {EQUIPMENT_HOURS_COPY.INTRO}
      </Text>
      {result === null ? (
        <Text
          className={EQUIPMENT_HOURS_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {EQUIPMENT_HOURS_COPY.ERROR}
        </Text>
      ) : result.categories.length === 0 ? (
        <Text className={EQUIPMENT_HOURS_NOTE_CLASS}>
          {EQUIPMENT_HOURS_COPY.EMPTY}
        </Text>
      ) : (
        <>
          {result.categories.map((category) => (
            <EquipmentHoursCategorySection
              key={category.categoryId}
              category={category}
            />
          ))}
          <ListPagination
            basePath={PATHS.ADMINISTRATION.EQUIPMENT_HOURS}
            currentPage={page}
            navLabel={EQUIPMENT_HOURS_COPY.PAGINATION_LABEL}
            pageCount={result.pageCount}
          />
        </>
      )}
    </main>
  );
};

export default EquipmentHoursReport;
