import { TStats } from '../../definitions/Stats';
import { TVariableField } from '../../Excel/definitions';
import { useAppSelector } from '../../store';
import { selectHoveredPart } from '../../SvgViz/svgVizSelectors';

export type TGetMappedData = {
  parsedData: unknown[];
  variableFields: TVariableField[];
  svgPartSelection: string[];
  svgParts: string[];
};

export default function useStats({
  parsedData,
  variableFields,
  svgPartSelection,
  svgParts,
}: TGetMappedData): TStats[] {
  const stats: TStats[] = [];
  const hoveredPart = useAppSelector(selectHoveredPart);
  const onlySvgParts = variableFields.filter((part) =>
    svgParts.includes(part.name)
  );

  const fieldVariablesThatAreNotSvgParts = variableFields.filter(
    (part) => !onlySvgParts.includes(part)
  );
  const fieldVariablesThatAreSvgParts = variableFields.filter((part) =>
    onlySvgParts.includes(part)
  );

  const filteredVariableByType = fieldVariablesThatAreNotSvgParts.filter(
    (part) => part.type === 'numeric'
  );

  const filteredSvgVariableFields = fieldVariablesThatAreSvgParts.filter(
    (part) => svgPartSelection.includes(part.name)
  );

  const filteredVariableFields =
    svgPartSelection.length > 0
      ? [...filteredSvgVariableFields, ...filteredVariableByType]
      : filteredVariableByType;

  filteredVariableFields.forEach((part: TVariableField) => {
    const scores = (parsedData as Record<string, string>[])
      .map((row) => parseFloat(row[part.name]))
      ?.filter((score) => !isNaN(score));

    if (scores.length === 0) return;

    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const sortedScores = scores.slice().sort((a, b) => a - b);
    const median = sortedScores[Math.floor(scores.length / 2)];
    const stdDev = Math.sqrt(
      scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scores.length
    );
    const min = Math.min(...scores);
    const max = Math.max(...scores);

    stats.push({
      svgPart: part.name,
      mean,
      median,
      stdDev,
      min,
      max,
      isHighlighted: part.name === hoveredPart,
    });
  });

  return stats;
}
