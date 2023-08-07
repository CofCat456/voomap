export function hasChanged(value: any, oldValue: any): boolean {
  return !Object.is(value, oldValue);
}
