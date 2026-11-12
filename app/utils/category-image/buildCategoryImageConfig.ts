import type { NextConfig } from "next";
import {
  CATEGORY_IMAGE,
  CATEGORY_IMAGE_REMOTE_PROTOCOL,
} from "../../constants/storage/CategoryImage.constants";

type ImagesConfig = NonNullable<NextConfig["images"]>;

const EMPTY_IMAGES_CONFIG: ImagesConfig = {
  remotePatterns: [],
};

const CATEGORY_IMAGE_PATHNAME = [
  CATEGORY_IMAGE.PUBLIC_OBJECT_PATH,
  CATEGORY_IMAGE.BUCKET,
  CATEGORY_IMAGE.REMOTE_PATH_WILDCARD,
].join(CATEGORY_IMAGE.PATH_SEPARATOR);

export const buildCategoryImageConfig = (
  supabaseUrl: string
): ImagesConfig => {
  if (!URL.canParse(supabaseUrl)) {
    return EMPTY_IMAGES_CONFIG;
  }

  const { hostname, port, protocol } = new URL(supabaseUrl);
  const isSecure =
    protocol === CATEGORY_IMAGE.HTTPS_URL_PROTOCOL;
  const isLocalHost = CATEGORY_IMAGE.LOCAL_HOSTNAMES.some(
    (localHostname) => localHostname === hostname
  );

  return {
    dangerouslyAllowLocalIP: isLocalHost,
    remotePatterns: [
      {
        hostname,
        pathname: CATEGORY_IMAGE_PATHNAME,
        port,
        protocol: isSecure
          ? CATEGORY_IMAGE_REMOTE_PROTOCOL.HTTPS
          : CATEGORY_IMAGE_REMOTE_PROTOCOL.HTTP,
      },
    ],
  };
};
