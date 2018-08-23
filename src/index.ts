import { Config, getConfig } from './config'
import * as dom from './dom'
import { override } from './override'
import { render } from './react'

export function parse(html: string, userOptions?: Config): React.ReactNode[] | React.ReactFragment {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.')
  }

  const options = getConfig(userOptions)
  const document = dom.parse(html, options)

  if (options.overrides) {
    override(document, options.overrides)
  }

  return render(document.childNodes, options)
}
