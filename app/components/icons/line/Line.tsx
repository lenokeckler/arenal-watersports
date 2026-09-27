import Image from "../../image/Image";
import { LINE_IMAGE_CLASS } from "./styles/Line.styles";

type LineProps = {
  className: string;
  src: string;
};

const Line = ({
  className,
  src = "/icons/line-green.svg",
}: LineProps) => (
  <div className={className}>
    <Image
      src={src}
      alt=""
      width={2826}
      height={14}
      className={LINE_IMAGE_CLASS}
    />
  </div>
);

export default Line;
