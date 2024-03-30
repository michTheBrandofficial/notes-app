export function stripPublicDir(path: `/public/${string}`): string {
  const newPath = path.slice('/public'.length)
  return newPath;
}