import { ArrowIconProps } from "./models/Arrow";

const RightArrow = ({
  className = "",
  color = "#b0c93e",
}: ArrowIconProps) => (
  <div className={className}>
    <svg
      version="1.1"
      id="ArrowIconV2"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 128 128"
      xmlSpace="preserve"
    >
      <path
        fill={color}
        d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 121.6C32.2 121.6 6.4 95.8 6.4 64S32.2 6.4 64 6.4s57.6 25.8 57.6 57.6-25.8 57.6-57.6 57.6zM49.2 38.4 73.6 64 49.2 89.6h13.5L86.4 64 62.7 38.4H49.2z"
      />
    </svg>
  </div>
);

export default RightArrow;
