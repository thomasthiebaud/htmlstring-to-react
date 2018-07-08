import * as React from 'react'
import { ASTElement, Attributes, NodeType } from './ast'

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

function transformChildren(children?: ASTElement[]) {
  return children || []
}

export function transform(element: ASTElement) {
  return {
    ...element,
    attributes: transformAttributes(element.attributes),
    children: transformChildren(element.children),
  }
}

export function renderElement(element: ASTElement): React.ReactNode {
  if (element.type === NodeType.TEXT_NODE) {
    return element.value
  } else if (element.type === NodeType.ELEMENT_NODE) {
    const children = element.value ? [
      element.value,
      ...renderElements(element.children),
    ] : renderElements(element.children)
    return React.createElement(element.name, element.attributes, children)
  }

  return null
}

export function renderElements(ast: ASTElement[]): React.ReactNode[] {
  return ast.reduce((elements, element) => {
    // Only keep text and tags. Remove everything else
    if (element.type === NodeType.ELEMENT_NODE || element.type === NodeType.TEXT_NODE) {
      elements.push(renderElement(transform(element)))
    }
    return elements
  }, [])
}
