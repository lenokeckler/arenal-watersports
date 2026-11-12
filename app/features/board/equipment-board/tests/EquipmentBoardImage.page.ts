import {
  IMAGE_ELEMENT_SELECTOR,
  IMAGE_PRIORITY_ATTRIBUTE,
  IMAGE_SOURCE_ATTRIBUTE,
} from "./EquipmentBoard.constants";

export const createEquipmentBoardImagePage = () => {
  const hasImage = (card: HTMLElement) =>
    card.querySelector(IMAGE_ELEMENT_SELECTOR) !== null;

  const getImageSource = (card: HTMLElement) =>
    card
      .querySelector(IMAGE_ELEMENT_SELECTOR)
      ?.getAttribute(IMAGE_SOURCE_ATTRIBUTE);

  const getImagePriority = (card: HTMLElement) =>
    card
      .querySelector(IMAGE_ELEMENT_SELECTOR)
      ?.getAttribute(IMAGE_PRIORITY_ATTRIBUTE);

  return { getImagePriority, getImageSource, hasImage };
};
