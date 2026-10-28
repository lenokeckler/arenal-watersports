import { Link, MaterialIcon } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS } from "@/app/constants";
import { PROFILE_PASSWORD_FORM_COPY } from "../constants/ProfilePasswordFormCopy.constants";
import { PROFILE_BACK_LINK_CLASS } from "../styles/ProfilePasswordForm.styles";

const ProfilePasswordBackLink = (): React.JSX.Element => (
  <Link
    href={PATHS.PROFILE.ROOT}
    className={PROFILE_BACK_LINK_CLASS}
  >
    <MaterialIcon name={MATERIAL_ICON_NAME.ARROW_BACK} />
    {PROFILE_PASSWORD_FORM_COPY.BACK}
  </Link>
);

export default ProfilePasswordBackLink;
