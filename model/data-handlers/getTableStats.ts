import { TStats } from '../definitions/Stats';
import { TVariableField } from '../Excel/definitions';

export type TGetMappedData = {
  parsedData: unknown[];
  variableFields: TVariableField[];
};

export function getTableStats({
  parsedData,
  variableFields,
}: TGetMappedData): TStats[] {
  const stats: TStats[] = [];

  variableFields.forEach((part: TVariableField) => {
    const scores = (parsedData as Record<string, string>[])
      .map((row) => parseFloat(row[part.name]))
      ?.filter((score) => !isNaN(score));
    console.log('scores', parsedData, part.name);
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
    });
  });
  console.log('stats', stats, variableFields);
  return stats;
}
