import { useMemo } from "react";

export interface TGetMappedData {
  parsedData: any[];
  headers: string[];
  mapping: Record<string, string>;
  selectedBodyParts: string[];
}

export interface Stats {
  bodyPart: string;
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
}

export function getTableStats({ parsedData, headers, mapping, selectedBodyParts }: TGetMappedData): Stats[] {
  const bodyParts = selectedBodyParts.map(part => `${part} score`);
console.log(bodyParts, 'bodyPArts', selectedBodyParts)
  const stats: Stats[] = [];

  console.log('Parsed Data:', parsedData);
  console.log('Headers:', headers);
  console.log('Mapping:', mapping);

  bodyParts.forEach(part => {
    console.log('Processing body part:', part);
    const scores = parsedData.map(row => parseFloat(row[part])).filter(score => !isNaN(score));
    console.log(`Scores for ${part}:`, scores);

    if (scores.length === 0) return;

    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const sortedScores = scores.slice().sort((a, b) => a - b);
    const median = sortedScores[Math.floor(scores.length / 2)];
    const stdDev = Math.sqrt(scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scores.length);
    const min = Math.min(...scores);
    const max = Math.max(...scores);

    console.log(`Stats for ${part} - Mean: ${mean}, Median: ${median}, StdDev: ${stdDev}, Min: ${min}, Max: ${max}`);

    stats.push({
      bodyPart: mapping[part] || part,
      mean,
      median,
      stdDev,
      min,
      max,
    });
  });

  console.log('Computed Stats:', stats);
  return stats;
}
