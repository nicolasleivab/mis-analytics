/* eslint-disable @typescript-eslint/no-explicit-any */
export function getMessageFromNestedKey(
  messages: Record<string, any>,
  key: string
): any {
  const keyParts = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return keyParts.reduce((obj, part) => obj?.[part], messages);
}
