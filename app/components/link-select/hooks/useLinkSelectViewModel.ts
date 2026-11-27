"use client";

import { useRouter } from "next/navigation";
import { STRING } from "@/app/constants";
import type { LinkSelectProps } from "../models/LinkSelectProps.interface";
import type { LinkSelectViewModel } from "../models/LinkSelectViewModel.interface";

export const useLinkSelectViewModel = ({
  allHref,
  allLabel,
  options,
}: LinkSelectProps): LinkSelectViewModel => {
  const router = useRouter();

  return {
    handleChange: (event) =>
      router.replace(
        options.find(
          (option) => option.id === event.target.value
        )?.href ?? allHref,
        { scroll: false }
      ),
    selectOptions: [
      {
        key: STRING.Empty,
        label: allLabel,
        value: STRING.Empty,
      },
      ...options.map((option) => ({
        key: option.id,
        label: option.label,
        value: option.id,
      })),
    ],
  };
};
