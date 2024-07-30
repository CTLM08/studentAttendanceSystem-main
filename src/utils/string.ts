export function toLinkCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
}
