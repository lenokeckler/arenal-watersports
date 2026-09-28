import Button from "@/app/components/button/Button";
import { BUTTON, SIZE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalog.copy";
import type { CategoryListCreateCtaProps } from "../models/CategoryListCreateCtaProps.interface";
import {
  CATEGORY_LIST_STICKY_CTA_BUTTON_CLASS,
  CATEGORY_LIST_STICKY_CTA_WRAPPER_CLASS,
} from "../styles/CategoryListStickyCta.styles";

const CategoryListStickyCta = ({
  onCreateCategory,
}: CategoryListCreateCtaProps): React.JSX.Element => (
  <div className={CATEGORY_LIST_STICKY_CTA_WRAPPER_CLASS}>
    <Button
      variant={BUTTON.PRIMARY}
      size={SIZE.FULL}
      onClick={onCreateCategory}
      className={CATEGORY_LIST_STICKY_CTA_BUTTON_CLASS}
    >
      {CATEGORY_CATALOG_COPY.CREATE_CTA}
    </Button>
  </div>
);

export default CategoryListStickyCta;
