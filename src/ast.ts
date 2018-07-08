import * as DomHandler from 'domhandler'
import * as Parser from 'htmlparser2/lib/Parser'

export interface Attributes { [keyof: string]: string }

export interface Element {
  attribs?: Attributes
  children?: Element[]
  data?: string
  type: string
  name?: string
}

export interface AST extends Array<Element> {}

export default function getAst(html: string): AST {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.')
  }
  const handler = new DomHandler()
  const parser = new Parser(handler, {
    decodeEntities: true,
    lowerCaseAttributeNames: false,
    lowerCaseTags: false,
    recognizeSelfClosing: true,
  })
  parser.write(html)
  parser.end()
  return handler.dom
}
