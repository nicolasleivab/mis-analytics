import { TSvgPart, TClipPath } from '../../../model';
import demoViz from './demoViz.json'; // DEMO DATA
import brainViz from './brainViz.json'; // BRAIN VIZ
import demoClipPaths from './demoClipPaths.json'; // DEMO CLIP PATHS

export type TSvgPartsData = {
  svgParts: TSvgPart[];
  clipPaths: TClipPath[];
};

/** Simulated fetch from the imported JSON file */
export async function getSvgVizParts(): Promise<{
  svgParts: TSvgPart[];
  clipPaths: TClipPath[];
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        svgParts: brainViz,
        clipPaths: [], // demoClipPaths,
      });
    }, 1000); // 1 second delay to simulate async behavior
  });
}
