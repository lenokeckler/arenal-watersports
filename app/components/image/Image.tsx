import NextImage, { ImageProps } from "next/image";

type CustomImageProps = ImageProps & {
  "aria-hidden"?: boolean;
  priority?: boolean;
};

const Image = (props: CustomImageProps) => {
  const {
    "aria-hidden": ariaHidden = true,
    priority = true,
    ...rest
  } = props;
  return (
    <NextImage
      aria-hidden={ariaHidden}
      priority={priority}
      {...rest}
    />
  );
};

export default Image;
