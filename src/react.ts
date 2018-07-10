import * as React from 'react'

import { getAttributes, NodeType } from './dom'
import { EnrichedElement } from './override'

export interface Attributes { [keyof: string]: string | React.EventHandler<any> }

const reactAttributesMap: { [keyof: string]: string } = {
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

function transformAttributes(attributesMap: NamedNodeMap): Attributes {
  const attributes = getAttributes(attributesMap)
  const transformedAttributes: Attributes = {}
  Object.keys(attributes).forEach((key) => {
    if (reactAttributesMap[key]) {
      transformedAttributes[reactAttributesMap[key]] = attributes[key]
    } else {
      transformedAttributes[key] = attributes[key]
    }
  })
  return transformedAttributes
}

function renderTextNode(node: Node & ChildNode) {
  return node.nodeValue
}

function renderElementNode(node: Node & ChildNode) {
  const element = transform(node as EnrichedElement)

  if (element.override) {
    return React.cloneElement(element.override(element.attributes, node.textContent))
  }

  if (element.childNodes) {
    return React.createElement(element.nodeName, element.attributes, render(element.childNodes))
  }
  return React.createElement(element.nodeName, element.attributes)
}

function transform(element: EnrichedElement) {
  return {
    attributes: transformAttributes(element.attributes),
    childNodes: element.childNodes,
    nodeName: element.nodeName.toLowerCase(),
    nodeType: element.nodeType,
    nodeValue: element.nodeValue,
    override: element.override,
  }
}

export function render(nodes: NodeListOf<Node & ChildNode>): React.ReactNode[] {
  const elements = []

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes.item(i)

    if (node.nodeType === NodeType.TEXT_NODE) {
      elements.push(renderTextNode(node))
    } else if (node.nodeType === NodeType.ELEMENT_NODE) {
      elements.push(renderElementNode(node))
    }
  }

  return elements
}
