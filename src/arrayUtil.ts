export function removeIndex<T>(data: T[], index: number) {
  return data.filter((_, i) => i !== index);
}
