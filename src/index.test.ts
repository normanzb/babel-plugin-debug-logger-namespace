import * as babelCore from '@babel/core'
import stripIndent from 'strip-indent'
import plugin from './index'

describe('babel-plugin-logger-namespace', () => {
  test('transforming NAMESPACE', () => {
    const input = stripIndent(`
      console.log(NAMESPACE);
    `)

    const expected = stripIndent(`
      console.log("src:test:abc");
    `)
    const result = babelCore.transform(input, {
      plugins: [plugin],
      cwd: '',
      filename: 'src/test/abc'
    })?.code ?? ''
    expect(result.trim()).toEqual(expected.trim())
  })

  test('transforming specified placeholder', () => {
    const input = stripIndent(`
      console.log(FOOBAR);
    `)

    const expected = stripIndent(`
      console.log("src:test:abc");
    `)
    const result = babelCore.transform(input, {
      plugins: [[plugin, { placeholder: 'FOOBAR' }]],
      cwd: '',
      filename: 'src/test/abc'
    })?.code ?? ''
    expect(result.trim()).toEqual(expected.trim())
  })

  test('does not transforming any files in node_modules', () => {
    const input = stripIndent(`
      console.log(NAMESPACE);
    `)

    const expected = stripIndent(`
      console.log(NAMESPACE);
    `)
    const result = babelCore.transform(input, {
      plugins: [[plugin, { placeholder: 'NAMESPACE' }]],
      cwd: '',
      filename: 'node_modules/src/test/abc'
    })?.code ?? ''
    expect(result.trim()).toEqual(expected.trim())
  })

  test('does transforming any files in folder whose name contains string node_modules', () => {
    const input = stripIndent(`
      console.log(NAMESPACE);
    `)

    const expected = stripIndent(`
      console.log("node_modulesfoo:src:test:abc");
    `)
    const result = babelCore.transform(input, {
      plugins: [[plugin, { placeholder: 'NAMESPACE' }]],
      cwd: '',
      filename: 'node_modulesfoo/src/test/abc'
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
      plugins: [[plugin, { stripPrefix: 'src:' }]],
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
      plugins: [[plugin, { stripPrefix: 'src:', stripSubfix: '.ts' }]],
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
      plugins: [[plugin, { stripPrefix: 'src:', prefix: 'prefix:' }]],
      cwd: '',
      filename: 'src/test/abc'
    })?.code ?? ''
    expect(result.trim()).toEqual(expected.trim())
  })
})
