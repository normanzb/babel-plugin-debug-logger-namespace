import nodePath from 'path'
import template from '@babel/template'
import type { PluginObj, PluginPass, NodePath } from '@babel/core'
import type { Statement, Identifier } from '@babel/types'
import pathToNamespace, { Options } from './pathToNamespace'

const ast = template.ast

type RemoveIndex<T> = {
  [ K in keyof T as string extends K ? never : number extends K ? never : K ]: T[K]
}

type PluginOptions = Options

type MyPluginPass = Omit<RemoveIndex<PluginPass>, 'opts'> & {
  opts?: PluginOptions
}

export default function (): PluginObj<MyPluginPass> {
  return {
    name: 'transform-import-meta',

    visitor: {
      Program (path, state) {
        if (
          state.file.opts.filename == null ||
          state.file.opts.root == null ||
          !state.file.opts.filename.startsWith(state.file.opts.root)
        ) {
          return
        }

        // make sure it does end with one and only one slash
        const rootFullPath = nodePath.normalize(state.file.opts.root + '/')
        const moduleFullPath = state.file.opts.filename
        const moduleLocalPath = moduleFullPath.slice(rootFullPath.length)
        const namespace = pathToNamespace(moduleLocalPath, state.opts ?? {})

        const metas: Array<NodePath<Identifier>> = []

        path.traverse({
          Identifier (idPath) {
            if (idPath.node.name === 'NAMESPACE') {
              metas.push(idPath)
            }
          }
        })

        if (metas.length === 0) {
          return
        }

        for (const meta of metas) {
          meta.replaceWith(ast`${JSON.stringify(namespace)}` as Statement)
        }
      }
    }
  }
}
