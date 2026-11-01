import { useId, useState } from "react";
import type { BoardCardToggleViewModel } from "../models/BoardCardToggleViewModel.interface";

export const useBoardCardToggleViewModel =
  (): BoardCardToggleViewModel => {
    const [isOpen, setIsOpen] = useState(false);
    const panelId = useId();

    return {
      isOpen,
      panelId,
      toggle: () => setIsOpen((current) => !current),
    };
  };
