import { TStats } from '../definitions/Stats';

export type TGetMappedData = {
  parsedData: unknown[];
  headers: string[];
  mapping: Record<string, string>;
  selectedSvgParts: string[];
  extraStats: string[];
};

export function getTableStats({
  parsedData,
  // headers,
  selectedSvgParts,
  extraStats,
}: TGetMappedData): TStats[] {
  const stats: TStats[] = [];

  [...selectedSvgParts, ...extraStats].forEach((part: string) => {
    const scores = (parsedData as Record<string, string>[])
      .map((row) => parseFloat(row[part]))
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
      svgPart: part,
      mean,
      median,
      stdDev,
      min,
      max,
    });
  });

  return stats;
}
