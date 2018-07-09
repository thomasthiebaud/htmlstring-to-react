import * as dom from './dom'
import { getOptions, Options } from './options'
import { render } from './react'

export function parse(html: string, userOptions?: Options): React.ReactNode[] {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.')
  }

  const options = getOptions(userOptions)

  return render(dom.parse(html, options))
}
