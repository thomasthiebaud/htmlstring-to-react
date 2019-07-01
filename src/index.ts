import { Config, getConfig } from './config';
import * as dom from './dom';
import { override } from './override';
import { render } from './react';

export function parse(
  html: React.ReactNode,
  userOptions?: Config,
  customWindow?: Window
): React.ReactNode[] {
  if (typeof html !== 'string') {
    return [html];
  }

  const options = getConfig(userOptions);
  const document = dom.parse(html, options, customWindow);

  if (options.overrides) {
    override(document, options.overrides);
  }

  return render(document.childNodes, options);
}
