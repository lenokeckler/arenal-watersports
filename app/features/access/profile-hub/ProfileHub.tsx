import FormSuccessNotice from "@/app/components/form-success-notice/FormSuccessNotice";
import ScreenHeader from "@/app/components/screen-header/ScreenHeader";
import {
  IMAGE_ALTS,
  PROFILE_SCREEN_TITLE_ID,
} from "@/app/constants";
import { PROFILE_COPY } from "./constants/ProfileCopy.constants";
import type { ProfileHubProps } from "./models/ProfileHubProps.interface";
import ProfileEntryList from "./ProfileEntryList";
import ProfileNoticeUrlCleaner from "./ProfileNoticeUrlCleaner";
import { buildProfileEntries } from "./utils/buildProfileEntries";
import { resolvePersonalEmailState } from "./utils/resolvePersonalEmailState";
import { resolveProfileNoticeMessage } from "./utils/resolveProfileNoticeMessage";

const ProfileHub = async ({
  notice,
}: ProfileHubProps): Promise<React.JSX.Element> => {
  const noticeMessage = resolveProfileNoticeMessage(notice);
  const entries = buildProfileEntries({
    personalEmailState: await resolvePersonalEmailState(),
  });

  return (
    <>
      <ScreenHeader
        title={PROFILE_COPY.TITLE}
        titleId={PROFILE_SCREEN_TITLE_ID}
        logoAlt={IMAGE_ALTS.COMPANY_LOGO}
      />
      <FormSuccessNotice message={noticeMessage} />
      <ProfileEntryList entries={entries} />
      {noticeMessage ? <ProfileNoticeUrlCleaner /> : null}
    </>
  );
};

export default ProfileHub;
