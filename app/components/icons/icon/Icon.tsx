import Image from "../../image/Image";
import { IconProps } from "./IconProps.interface";

const Icon = ({
  src,
  alt,
  size = 24,
  className,
  priority = false,
  "aria-hidden": ariaHidden = false,
  ...props
}: IconProps & {
  priority?: boolean;
  "aria-hidden"?: boolean;
}) => {
  if (typeof src === "function") {
    const SVGComponent = src;
    const restProps = { ...props } as Record<
      string,
      unknown
    >;
    delete restProps.fill;
    return (
      <SVGComponent
        width={size}
        height={size}
        className={className}
        aria-hidden={ariaHidden}
        {...restProps}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority={priority}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
};

export default Icon;
