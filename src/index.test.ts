import * as babelCore from '@babel/core'
import stripIndent from 'strip-indent'
import importMetaPlugin from './index'

describe('babel-plugin-logger-namespace', () => {
  test('transforming NAMESPACE', () => {
    const input = stripIndent(`
      console.log(NAMESPACE);
    `)

    const expected = stripIndent(`
      console.log("src:test:abc");
    `)
    const result = babelCore.transform(input, {
      plugins: [importMetaPlugin],
      cwd: '',
      filename: 'src/test/abc'
    })?.code ?? ''
    expect(result.trim()).toEqual(expected.trim())
  })

  test('removing prefix in namespace that matches `stripPrefix`', () => {
    const input = stripIndent(`
      console.log(NAMESPACE);
    `)

    const expected = stripIndent(`
      console.log("test:abc");
    `)
    const result = babelCore.transform(input, {
      plugins: [[importMetaPlugin, { stripPrefix: 'src:' }]],
      cwd: '',
      filename: 'src/test/abc'
    })?.code ?? ''
    expect(result.trim()).toEqual(expected.trim())
  })

  test('removing subfix in namespace that matches `stripSubfix`', () => {
    const input = stripIndent(`
      console.log(NAMESPACE);
    `)

    const expected = stripIndent(`
      console.log("test:abc");
    `)
    const result = babelCore.transform(input, {
      plugins: [[importMetaPlugin, { stripPrefix: 'src:', stripSubfix: '.ts' }]],
      cwd: '',
      filename: 'src/test/abc.ts'
    })?.code ?? ''
    expect(result.trim()).toEqual(expected.trim())
  })

  test('adding namespace according to `prefix`', () => {
    const input = stripIndent(`
      console.log(NAMESPACE);
    `)

    const expected = stripIndent(`
      console.log("prefix:test:abc");
    `)
    const result = babelCore.transform(input, {
      plugins: [[importMetaPlugin, { stripPrefix: 'src:', prefix: 'prefix:' }]],
      cwd: '',
      filename: 'src/test/abc'
    })?.code ?? ''
    expect(result.trim()).toEqual(expected.trim())
  })
})
