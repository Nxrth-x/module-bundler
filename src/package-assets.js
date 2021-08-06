import babel from '@babel/core'
import traverse from '@babel/traverse'
import { v4 as uuid } from 'uuid'
import path from 'path'
import fs from 'fs'
import './types.js'

/**
 * Generates the asset of a given filename
 *
 * @param {string} filename Entry point file
 * @returns {AssetType} An asset representation of the file
 */
export function generateAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')

  const ast = generateAst(content)
  const dependencies = generateDependencies(ast)
  const code = generateCode(ast)

  return assetFactory(filename, dependencies, code)
}

/**
 * Generates a AST of a given code sample
 *
 * @param {string} code
 * @returns
 */
function generateAst(code) {
  return babel.parseSync(code, {
    ast: true,
  })
}

/**
 * Generates a transpiled version of the AST
 *
 * @param {any} ast
 * @returns {string}
 */
function generateCode(ast) {
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env'],
  })

  return code
}

/**
 * Generates a list of dependencies of a given bundle
 *
 * @param {any} ast
 * @returns {string[]}
 */
function generateDependencies(ast) {
  const dependencies = []

  traverse.default(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value)
    },
  })

  return dependencies
}

/**
 * Creates an Asset object
 *
 * @param {string} filename
 * @param {string[]} dependencies
 * @param {string} code
 * @returns {AssetType} Asset
 */
function assetFactory(filename, dependencies, code) {
  const id = uuid()
  const mapping = {}

  return {
    id,
    filename,
    dependencies,
    code,
    mapping,
  }
}

/**
 *
 * @param {string} entry Entry point file
 * @returns {AssetType[]} A graph of all the dependencies
 */
export default function generateDependenciesGraph(entry) {
  const mainAsset = generateAsset(entry)

  const queue = [mainAsset]

  for (const asset of queue) {
    const dirname = path.dirname(asset.filename)

    asset.dependencies.forEach(dependencyPath => {
      const absolutePath = path.join(dirname, dependencyPath)

      const childAsset = generateAsset(absolutePath)

      asset.mapping[dependencyPath] = childAsset.id

      queue.push(childAsset)
    })
  }

  return queue
}
