"use client";
import { FC } from "react";
import { SliderIconProps } from "./SliderIconProps.interface";
import {
  SLIDER_ICON,
  SLIDER_ICON_PATHS,
  SLIDER_ICON_ATTRIBUTES,
} from "./SliderIcon.constants";
import { STRING } from "@/app/constants";

const SliderIcon: FC<SliderIconProps> = ({
  width = SLIDER_ICON.WIDTH,
  height = SLIDER_ICON.HEIGHT,
  fill = SLIDER_ICON.FILL,
  className = STRING.Empty,
  preserveAspectRatio = SLIDER_ICON.PRESERVE_ASPECT_RATIO,
}) => (
  <svg
    width={width}
    height={height}
    viewBox={SLIDER_ICON_ATTRIBUTES.VIEW_BOX}
    fill={fill}
    xmlns={SLIDER_ICON_ATTRIBUTES.XMLNS}
    className={className}
    preserveAspectRatio={preserveAspectRatio}
  >
    <g
      id={SLIDER_ICON_ATTRIBUTES.BG_CARRIER_ID}
      strokeWidth={SLIDER_ICON_ATTRIBUTES.STROKE_WIDTH}
    />
    <g
      id={SLIDER_ICON_ATTRIBUTES.TRACE_CARRIER_ID}
      strokeLinecap={SLIDER_ICON_ATTRIBUTES.STROKE_LINE_CAP}
      strokeLinejoin={
        SLIDER_ICON_ATTRIBUTES.STROKE_LINE_JOIN
      }
    />
    <g id={SLIDER_ICON_ATTRIBUTES.ICON_CARRIER_ID}>
      <path
        d={SLIDER_ICON_PATHS.MAIN_PATH}
        fill={SLIDER_ICON_PATHS.FILL_COLOR}
      />
      <path
        fillRule={SLIDER_ICON_ATTRIBUTES.FILL_RULE}
        clipRule={SLIDER_ICON_ATTRIBUTES.CLIP_RULE}
        d={SLIDER_ICON_PATHS.RULE_PATH}
        fill={SLIDER_ICON_PATHS.FILL_COLOR}
      />
    </g>
  </svg>
);

export default SliderIcon;
