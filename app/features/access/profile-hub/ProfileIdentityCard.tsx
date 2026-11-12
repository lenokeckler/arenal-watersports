import Text from "@/app/components/text/Text";
import { PROFILE_IDENTITY_COPY } from "./constants/ProfileIdentityCopy.constants";
import type { ProfileIdentity } from "./models/ProfileIdentity.interface";
import {
  PROFILE_AVATAR_CLASS,
  PROFILE_CHIP_CLASS,
  PROFILE_CHIPS_CLASS,
  PROFILE_DETAIL_LABEL_CLASS,
  PROFILE_DETAILS_CLASS,
  PROFILE_IDENTITY_CLASS,
  PROFILE_NAME_CLASS,
  PROFILE_ROLE_CLASS,
  PROFILE_USERNAME_CLASS,
} from "./styles/ProfileIdentity.styles";
import { getProfileInitials } from "./utils/getProfileInitials";

const ProfileIdentityCard = ({
  identity,
}: {
  identity: ProfileIdentity;
}): React.JSX.Element => (
  <section className={PROFILE_IDENTITY_CLASS}>
    <div
      role="img"
      aria-label={PROFILE_IDENTITY_COPY.AVATAR_LABEL}
      className={PROFILE_AVATAR_CLASS}
    >
      {getProfileInitials(identity.fullName)}
    </div>
    <Text className={PROFILE_NAME_CLASS}>
      {identity.fullName}
    </Text>
    <Text className={PROFILE_USERNAME_CLASS}>
      {`@${identity.username}`}
    </Text>
    <div className={PROFILE_DETAILS_CLASS}>
      <Text className={PROFILE_DETAIL_LABEL_CLASS}>
        {PROFILE_IDENTITY_COPY.ROLE}
      </Text>
      <Text className={PROFILE_ROLE_CLASS}>
        {identity.role}
      </Text>
      <Text className={PROFILE_DETAIL_LABEL_CLASS}>
        {PROFILE_IDENTITY_COPY.AREAS}
      </Text>
      <ul className={PROFILE_CHIPS_CLASS}>
        {identity.areas.map((area) => (
          <li
            key={area}
            className={PROFILE_CHIP_CLASS}
          >
            {area}
          </li>
        ))}
      </ul>
      <Text className={PROFILE_DETAIL_LABEL_CLASS}>
        {PROFILE_IDENTITY_COPY.MARKS}
      </Text>
      {identity.marks.length === 0 ? (
        <Text className={PROFILE_USERNAME_CLASS}>
          {PROFILE_IDENTITY_COPY.NO_MARKS}
        </Text>
      ) : (
        <ul className={PROFILE_CHIPS_CLASS}>
          {identity.marks.map((mark) => (
            <li
              key={mark}
              className={PROFILE_CHIP_CLASS}
            >
              {mark}
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

export default ProfileIdentityCard;
