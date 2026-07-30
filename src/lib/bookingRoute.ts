export function routeToBookingHref(route: string) {
  const [from, to] = route.split(/\s+to\s+/i).map((part) => part.trim());
  if (!from || !to) return "/#book";

  const params = new URLSearchParams({ from, to });
  return `/?${params.toString()}#book`;
}

export function cabToBookingHref(cab: string) {
  const params = new URLSearchParams({ cab });
  return `/?${params.toString()}#book`;
}
