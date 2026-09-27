"use client";

import { useEffect, useState } from "react";

export const useWidthSize = () => {
  const TABLET_WIDTH = 1025;
  const [isMobile, setIsMobile] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < TABLET_WIDTH);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [TABLET_WIDTH]);

  return { isMobile, widthWindow: TABLET_WIDTH };
};
