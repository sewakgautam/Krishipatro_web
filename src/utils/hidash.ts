export function zip<T, U, V>(a: T[], b: U[], cb: (a: T, b: U) => V): V[] {
  const len = Math.min(a.length, b.length);
  const result: V[] = [];
  for (let i = 0; i < len; i++) {
    result.push(cb(a[i], b[i]));
  }
  return result;
}
