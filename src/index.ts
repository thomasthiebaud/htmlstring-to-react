import * as dom from './dom'
import { addEventHandlers } from './event'
import { getOptions, Options } from './options'
import { render } from './react'

export function parse(html: string, userOptions?: Options): React.ReactNode[] {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.')
  }

  const options = getOptions(userOptions)
  const document = dom.parse(html, options)

  if (options.eventHandlers) {
    addEventHandlers(document, options.eventHandlers)
  }

  return render(document.childNodes)
}
