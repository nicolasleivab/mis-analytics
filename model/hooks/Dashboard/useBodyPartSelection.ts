import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store';
import { selectUniqueSvgParts } from '../../SvgViz/svgVizSelectors';

export default function useBodyPartSelection() {
  // Pull unique body parts from Redux
  const reduxUniqueParts = useAppSelector(selectUniqueSvgParts);

  const [bodyPartSelection, setBodyPartSelection] = useState<string[]>([]);

  useEffect(() => {
    setBodyPartSelection(reduxUniqueParts);
  }, [reduxUniqueParts]);

  // Toggle logic
  const handleBodyPartSelection = (selected: string) => {
    if (bodyPartSelection.includes(selected)) {
      setBodyPartSelection((prev) => prev.filter((part) => part !== selected));
    } else {
      setBodyPartSelection((prev) => [...prev, selected]);
    }
  };

  return { bodyPartSelection, handleBodyPartSelection };
}
