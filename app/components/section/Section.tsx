import React, { forwardRef } from "react";
import SectionProps from "./SectionProps.interface";

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { id, ariaLabel, className = "", children, ...rest },
    ref
  ) => (
    <section
      id={id}
      role="region"
      aria-labelledby={ariaLabel}
      className={className}
      ref={ref}
      {...rest}
    >
      {children}
    </section>
  )
);
Section.displayName = "Section";

export default Section;
