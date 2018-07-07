import DomHandler from 'domhandler'
import { Options, Parser } from 'htmlparser2'

export function parse(html: string, options: Options) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.')
  }
  const handler = new DomHandler()
  const parser = new Parser(handler, options)
  parser.write(html)
  parser.end()
  return handler.dom
}
