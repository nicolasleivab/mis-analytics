import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store';
import { selectUniqueSvgParts } from '../../SvgViz/svgVizSelectors';

export default function useSvgPartSelection() {
  // Pull unique svg parts from Redux
  const reduxUniqueParts = useAppSelector(selectUniqueSvgParts);

  const [svgPartSelection, setSvgPartSelection] = useState<string[]>([]);

  useEffect(() => {
    setSvgPartSelection(reduxUniqueParts);
  }, [reduxUniqueParts]);

  // Toggle logic
  const handleSvgPartSelection = (selected: string) => {
    if (svgPartSelection.includes(selected)) {
      setSvgPartSelection((prev) => prev.filter((part) => part !== selected));
    } else {
      setSvgPartSelection((prev) => [...prev, selected]);
    }
  };

  return { svgPartSelection, handleSvgPartSelection };
}
