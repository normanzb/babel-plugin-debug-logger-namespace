export type Options = {
  stripPrefix?: string
  prefix?: string
}

export default function (path: string, { stripPrefix, prefix }: Options) {
  let result = path.replace(/[/|\\]/g, ':')

  if (stripPrefix !== undefined && result.startsWith(stripPrefix)) {
    result = result.slice(stripPrefix.length)
  }

  if (prefix !== undefined) {
    result = prefix + result
  }

  return result
}
