import { ArrowIconProps } from "./models/Arrow";

const LeftArrow = ({
  className = "",
  color = "#b0c93e",
}: ArrowIconProps) => (
  <div className={className}>
    <svg
      version="1.1"
      id="LeftArrowIcon"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 128 128"
      xmlSpace="preserve"
    >
      <path
        fill={color}
        d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm1.3-82.8L41.6 64l23.6 25.5h13.5L54.4 64l24.4-25.5H65.3z"
      />
    </svg>
  </div>
);

export default LeftArrow;
