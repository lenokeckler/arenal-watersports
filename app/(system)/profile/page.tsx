import type { Metadata } from "next";
import { PROFILE_NOTICE_QUERY_PARAM } from "@/app/constants";
import { PROFILE_METADATA } from "@/app/features/access/profile-hub/constants/ProfileMetadata.constants";
import ProfileHub from "@/app/features/access/profile-hub/ProfileHub";

export const metadata: Metadata = PROFILE_METADATA;

const ProfilePage = async ({
  searchParams,
}: PageProps<"/profile">): Promise<React.JSX.Element> => {
  const query = await searchParams;

  return (
    <ProfileHub
      notice={query[PROFILE_NOTICE_QUERY_PARAM]}
    />
  );
};

export default ProfilePage;
