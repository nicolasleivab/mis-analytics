import { useState } from 'react';
import { BODY_PARTS } from '../../constants/body-parts';

const uniqueBodyParts = [...new Set(BODY_PARTS.map((part) => part.name))];

export default function useBodyPartSelection() {
  const [bodyPartSelection, setBodyPartSelection] =
    useState<string[]>(uniqueBodyParts);

  const handleBodyPartSelection = (selected: string) => {
    if (bodyPartSelection.includes(selected)) {
      setBodyPartSelection(
        bodyPartSelection.filter((part) => part !== selected)
      );
    } else {
      setBodyPartSelection([...bodyPartSelection, selected]);
    }
  };

  return { bodyPartSelection, handleBodyPartSelection };
}
