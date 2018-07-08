import * as React from 'react'
import { Attributes, Element } from './ast'

const reactAttributesMap: Attributes = {
  acceptcharset: 'acceptCharset',
  accesskey: 'accessKey',
  allowfullscreen: 'allowFullScreen',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  charset: 'charSet',
  class: 'className',
  classid: 'classID',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controlslist: 'controlsList',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  enctype: 'encType',
  for: 'htmlFor',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formmethod: 'formMethod',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  hreflang: 'hrefLang',
  httpequiv: 'httpEquiv',
  inputmode: 'inputMode',
  keyparams: 'keyParams',
  keyyype: 'keyType',
  marginheight: 'marginHeight',
  marginwidth: 'marginWidth',
  maxlength: 'maxLength',
  mediagroup: 'mediaGroup',
  minlength: 'minLength',
  novalidate: 'noValidate',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  rowspan: 'rowSpan',
  spellcheck: 'spellCheck',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  tabindex: 'tabIndex',
  usemap: 'useMap',
}

function transformAttributes(attributes?: Attributes): Attributes {
  if (!attributes) {
    return null
  }

  const transformedAttributes: Attributes = {}
  Object.keys(attributes).forEach((key) => {
    if (!attributes[key].startsWith('on') && reactAttributesMap[key]) {
      transformedAttributes[reactAttributesMap[key]] = attributes[key]
    }
  })
  return transformedAttributes
}

function transformChildren(children?: Element[]) {
  return children || []
}

export function transform(element: Element) {
  return {
    ...element,
    attribs: transformAttributes(element.attribs),
    children: transformChildren(element.children),
  }
}

export function renderElement(element: Element): React.ReactNode {
  if (element.type === 'text') {
    return element.data
  } else if (element.type === 'tag') {
    const children = element.data ? [
      element.data,
      ...renderElements(element.children),
    ] : renderElements(element.children)
    return React.createElement(element.name, element.attribs, children)
  }

  return null
}

export function renderElements(ast: Element[]): React.ReactNode [] {
  return ast.reduce((elements, element) => {
    // Only keep text and tags. Remove everything else like comments, scritps,...
    if (element.type === 'tag' || element.type === 'text') {
      elements.push(renderElement(transform(element)))
    }
    return elements
  }, [])
}
