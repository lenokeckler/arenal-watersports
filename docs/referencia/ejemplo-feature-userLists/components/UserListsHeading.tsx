import { JSX } from "react";
import InlineText from "@/app/components/text/InlineText";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { UserListsHeadingProps } from "../models/UserListsHeadingProps.interface";
import {
  USER_LISTS_HEADING_CLASS,
  USER_LISTS_HEADING_COUNT_CLASS,
  USER_LISTS_HEADING_TITLE_CLASS,
} from "../styles/UserListsHeading.styles";

const UserListsHeading = ({
  title,
  userCount,
}: UserListsHeadingProps): JSX.Element => (
  <div className={USER_LISTS_HEADING_CLASS}>
    <Title
      variant={TitleVariant.AUXILIAR}
      text={title}
      className={USER_LISTS_HEADING_TITLE_CLASS}
    />
    <InlineText className={USER_LISTS_HEADING_COUNT_CLASS}>
      {userCount}
    </InlineText>
  </div>
);

export default UserListsHeading;
