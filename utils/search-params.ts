// export function hasOnlyAllowedSearchParams( NOT RECOMMENDED MIGHT DELETE
//   searchParams: URLSearchParams,
//   allowedKeys: string[]
// ): boolean {
//   const entries = Array.from(searchParams.entries());

//   return (
//     entries.every(([key]) => allowedKeys.includes(key)) &&
//     entries.length === allowedKeys.length
//   );
// }

export function getQueryParams(
  searchParams: URLSearchParams,
  keys: string[]
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key of keys) {
    const value = searchParams.get(key);
    if (value !== null) {
      result[key] = value.toLowerCase();
    }
  }

  return result;
}
