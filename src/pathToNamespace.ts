export type Options = {
  placeholder?: string
  stripPrefix?: string
  prefix?: string
  stripSubfix?: string
}

export default function (path: string, { stripPrefix, stripSubfix, prefix }: Options) {
  let result = path.replace(/[/|\\]/g, ':')

  if (stripPrefix !== undefined) {
    result = result.replace(new RegExp(`^(${stripPrefix})`), '')
  }

  if (stripSubfix !== undefined) {
    result = result.replace(new RegExp(`(${stripSubfix})$`), '')
  }

  if (prefix !== undefined) {
    result = prefix + result
  }

  return result
}
