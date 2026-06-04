import type { Finding } from "@goaegis/shared-types";

export interface CustomScanner {
  name: string;
  scan: () => Promise<Finding[]>;
}

export async function runCustomScanners(scanners: CustomScanner[]): Promise<Finding[]> {
  const results = await Promise.all(scanners.map((scanner) => scanner.scan()));
  return results.flat();
}

