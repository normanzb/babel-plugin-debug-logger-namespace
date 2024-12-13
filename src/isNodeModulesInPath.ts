import path from 'path'

export const isNodeModulesInPath = (pathString: string) => {
  const segments = path.normalize(pathString).split(path.sep)
  return segments.includes('node_modules')
}
