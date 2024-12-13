import { isNodeModulesInPath } from './isNodeModulesInPath'

describe('isNodeModuleInPath', () => {
  test('return true when node_modules is in the path', () => {
    expect(isNodeModulesInPath('/foobar/node_modules/abc')).toEqual(true)
  })

  test('return true when node_modules at the end of the path', () => {
    expect(isNodeModulesInPath('/foobar/node_modules/')).toEqual(true)
    expect(isNodeModulesInPath('/foobar/node_modules')).toEqual(true)
  })

  test('return true when node_modules at the beginning of the path', () => {
    expect(isNodeModulesInPath('/node_modules/')).toEqual(true)
    expect(isNodeModulesInPath('/node_modules')).toEqual(true)
    expect(isNodeModulesInPath('/node_modules/abc')).toEqual(true)
  })

  test('return false when folder node_modules is not found in path ', () => {
    expect(isNodeModulesInPath('/node_modulesadf/')).toEqual(false)
    expect(isNodeModulesInPath('/sdfnode_modules')).toEqual(false)
    expect(isNodeModulesInPath('/sdfdsf/foonode_modules/abc')).toEqual(false)
  })
})
