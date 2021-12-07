import pathToNamespace from './pathToNamespace'

describe('pathToNamespace()', () => {
  test('converting all slashes into colons', () => {
    const result = pathToNamespace('src/abc/work', {})
    expect(result).toEqual('src:abc:work')
  })

  test('converting even backward slashes into colons', () => {
    const result = pathToNamespace('src/abc\\work/foo\\bar/something/else', {})
    expect(result).toEqual('src:abc:work:foo:bar:something:else')
  })

  test('stripping prefix according to `stripPrefix`', () => {
    const result = pathToNamespace('src/abcwork/foo\\bar/something/else', {
      stripPrefix: 'src:abc'
    })
    expect(result).toEqual('work:foo:bar:something:else')
  })

  test('supporting multiple prefix to be removed', () => {
    let result = pathToNamespace('src/abcwork/foo\\bar/something/else.ts', {
      stripPrefix: 'src:abc|source:abc',
      stripSubfix: '.ts'
    })
    expect(result).toEqual('work:foo:bar:something:else')
    result = pathToNamespace('source/abcwork/foo\\bar/something/else.ts', {
      stripPrefix: 'src:abc|source:abc',
      stripSubfix: '.ts|.tsx'
    })
    expect(result).toEqual('work:foo:bar:something:else')
  })

  test('stripping subfix according to `stripSubfix`', () => {
    const result = pathToNamespace('src/abcwork/foo\\bar/something/else.ts', {
      stripPrefix: 'src:abc',
      stripSubfix: '.ts'
    })
    expect(result).toEqual('work:foo:bar:something:else')
  })

  test('supporting multiple subfix to be removed', () => {
    let result = pathToNamespace('src/abcwork/foo\\bar/something/else.tsx', {
      stripPrefix: 'src:abc',
      stripSubfix: '.ts|.tsx'
    })
    expect(result).toEqual('work:foo:bar:something:else')
    result = pathToNamespace('src/abcwork/foo\\bar/something/else.ts', {
      stripPrefix: 'src:abc',
      stripSubfix: '.ts|.tsx'
    })
    expect(result).toEqual('work:foo:bar:something:else')
  })

  test('adding prefix according to `prefix`', () => {
    const result = pathToNamespace('abcwork/foo\\bar/something/else', {
      prefix: 'prefix:'
    })
    expect(result).toEqual('prefix:abcwork:foo:bar:something:else')
  })
})
