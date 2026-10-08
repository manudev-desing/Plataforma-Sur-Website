const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Normalizes asset paths so they work correctly across:
 * 1. Local development (root '/')
 * 2. GitHub Pages repository subpaths (e.g. '/Plataforma-Sur-Website')
 * 3. Custom production domains
 */
export function getAssetPath(path: string): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}
