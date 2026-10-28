import FormSuccessNotice from "@/app/components/form-success-notice/FormSuccessNotice";
import ScreenHeader from "@/app/components/screen-header/ScreenHeader";
import {
  IMAGE_ALTS,
  PROFILE_SCREEN_TITLE_ID,
} from "@/app/constants";
import { PROFILE_COPY } from "./constants/ProfileCopy.constants";
import type { ProfileHubProps } from "./models/ProfileHubProps.interface";
import ProfileEntryLink from "./ProfileEntryLink";
import ProfileNoticeUrlCleaner from "./ProfileNoticeUrlCleaner";
import { resolveProfileNoticeMessage } from "./utils/resolveProfileNoticeMessage";

const ProfileHub = ({
  notice,
}: ProfileHubProps): React.JSX.Element => {
  const noticeMessage = resolveProfileNoticeMessage(notice);

  return (
    <>
      <ScreenHeader
        title={PROFILE_COPY.TITLE}
        titleId={PROFILE_SCREEN_TITLE_ID}
        logoAlt={IMAGE_ALTS.COMPANY_LOGO}
      />
      <FormSuccessNotice message={noticeMessage} />
      <ProfileEntryLink />
      {noticeMessage ? <ProfileNoticeUrlCleaner /> : null}
    </>
  );
};

export default ProfileHub;
