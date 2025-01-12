import { TSvgPart } from '../../../model';
import demoViz from './demoViz.json'; // DEMO DATA

/** Simulated fetch from the imported JSON file */
export async function getSvgVizParts(): Promise<TSvgPart[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(demoViz as TSvgPart[]);
    }, 1000); // 1 second delay to simulate async behavior
  });
}
