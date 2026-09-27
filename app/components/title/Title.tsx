import { TitleProps } from "./models/TitleProps.interface";
import { TitleVariant } from "./constants";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { useSlugify } from "./utils/useSlugify";

const Title = ({
  id,
  variant,
  text,
  children,
  className,
}: TitleProps) => {
  const slugifiedText = useSlugify(safeString(text));
  const finalID = id ?? slugifiedText;
  switch (variant) {
    case TitleVariant.PRIMARY:
      return (
        <h1
          id={finalID}
          className={className}
        >
          {children ?? text}
        </h1>
      );
    case TitleVariant.SECONDARY:
      return (
        <h2
          id={finalID}
          className={className}
        >
          {children ?? text}
        </h2>
      );
    case TitleVariant.AUXILIAR:
      return (
        <h3
          id={finalID}
          className={className}
        >
          {children ?? text}
        </h3>
      );
    default:
      return null;
  }
};

export default Title;
