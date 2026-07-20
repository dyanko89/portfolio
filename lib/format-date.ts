// Frontmatter dates are bare YYYY-MM-DD strings; without an explicit UTC
// timezone they render one day early in negative-UTC locales.
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
