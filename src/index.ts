import { Config, getConfig } from './config'
import * as dom from './dom'
import { addEventHandlers } from './event'
import { render } from './react'

export function parse(html: string, userOptions?: Config): React.ReactNode[] {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.')
  }

  const options = getConfig(userOptions)
  const document = dom.parse(html, options)

  if (options.eventHandlers) {
    addEventHandlers(document, options.eventHandlers)
  }

  return render(document.childNodes)
}
