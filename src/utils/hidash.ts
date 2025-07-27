export function zip<
  T extends any[],
  R
>(
  ...args: [...{ [K in keyof T]: T[K][] }, ( ...items: { [K in keyof T]: T[K] } ) => R]
): R[] {
  const arrays = args.slice(0, -1) as { [K in keyof T]: T[K][] };
  const cb = args[args.length - 1] as (...items: any[]) => R;
  if (arrays.length === 0) return [];
  const len = Math.min(...arrays.map(arr => arr.length));
  const result: R[] = [];
  for (let i = 0; i < len; i++) {
    const items = arrays.map(arr => arr[i]);
    result.push(cb(...items));
  }
  return result;
}
