import * as dom from './dom'
import { render } from './react'

export function parse(html: string): React.ReactNode[] {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.')
  }

  return render(dom.parse(html))
}
