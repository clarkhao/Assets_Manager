/**
 * name: file name
 * size: file size
 * mime: file mime
 * createAt: file put in drive time
 * lastUpdateAt: file name updated time
 */
export type Asset = {
  id: number;
  name: string;
  size: number;
  mime: string;
  createAt: Date;
  lastUpdateAt: Date;
} 