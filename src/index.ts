import getAst from './ast'
import { renderElements } from './react'

export function parse(html: string): React.ReactNode[] {
  const ast = getAst(html)
  return renderElements(ast)
}
