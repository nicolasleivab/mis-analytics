import { TStats } from '../definitions/Stats';

export type TGetMappedData = {
  parsedData: unknown[];
  headers: string[];
  mapping: Record<string, string>;
  selectedBodyParts: string[];
  extraStats: string[];
};

export function getTableStats({
  parsedData,
  // headers,
  mapping,
  selectedBodyParts,
  extraStats,
}: TGetMappedData): TStats[] {
  const bodyParts = selectedBodyParts.map((part) => `${part} score`);

  const stats: TStats[] = [];

  [...bodyParts, ...extraStats].forEach((part: string) => {
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

    // console.log(`Stats for ${part} - Mean: ${mean}, Median: ${median}, StdDev: ${stdDev}, Min: ${min}, Max: ${max}`);

    stats.push({
      bodyPart: mapping[part] || part,
      mean,
      median,
      stdDev,
      min,
      max,
    });
  });

  return stats;
}
