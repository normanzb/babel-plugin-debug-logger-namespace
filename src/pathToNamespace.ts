export type Options = {
  stripPrefix?: string
  prefix?: string
  stripSubfix?: string
}

export default function (path: string, { stripPrefix, stripSubfix, prefix }: Options) {
  let result = path.replace(/[/|\\]/g, ':')

  if (stripPrefix !== undefined && result.startsWith(stripPrefix)) {
    result = result.slice(stripPrefix.length)
  }

  if (stripSubfix !== undefined && result.endsWith(stripSubfix)) {
    result = result.slice(0, result.length - stripSubfix.length)
  }

  if (prefix !== undefined) {
    result = prefix + result
  }

  return result
}
