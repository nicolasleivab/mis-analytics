import { TSvgPart } from '../../../model';

/** Simulated post to server (console.log for now) */
export async function postSvgPartsToServer(parts: TSvgPart[]): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('[Mock] Sending parts to server:', parts);
      resolve();
    }, 1000); // 1 second delay to simulate async behavior
  });
}
