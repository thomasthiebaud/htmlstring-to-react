import * as React from 'react';

import { Config } from './config';
import { getAttributes, NodeType } from './dom';
import { EnrichedElement } from './override';

export interface Attributes {
  [keyof: string]: string | React.EventHandler<any>;
}

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
};

function transformAttributes(
  attributesMap: NamedNodeMap,
  options: Config
): Attributes {
  const attributes = getAttributes(attributesMap);
  const transformedAttributes: Attributes = {};
  Object.keys(attributes).forEach((key) => {
    if (reactAttributesMap[key]) {
      transformedAttributes[reactAttributesMap[key]] = attributes[key];
    } else {
      transformedAttributes[key] = attributes[key];
    }

    if (!transformedAttributes.key) {
      const isKey = options.useAsKey.some((possibleKey) => possibleKey === key);

      if (isKey) {
        transformedAttributes.key = attributes[key];
      }
    }
  });

  return transformedAttributes;
}

function renderTextNode(node: Node & ChildNode) {
  return node.nodeValue;
}

function transform(element: EnrichedElement, options: Config) {
  return {
    attributes: transformAttributes(element.attributes, options),
    childNodes: element.childNodes,
    nodeName: element.nodeName.toLowerCase(),
    nodeType: element.nodeType,
    nodeValue: element.nodeValue,
    override: element.override,
  };
}

function renderElementNode(node: Node & ChildNode, options: Config) {
  const element = transform(node as EnrichedElement, options);

  if (element.override) {
    return React.cloneElement(
      element.override(element.attributes, node.textContent)
    );
  }

  if (element.childNodes && element.childNodes.length > 0) {
    return React.createElement(
      element.nodeName,
      element.attributes,
      render(element.childNodes, options) // eslint-disable-line
    );
  }
  return React.createElement(element.nodeName, element.attributes);
}

export function render(
  nodes: NodeListOf<Node & ChildNode>,
  options: Config
): React.ReactNode[] {
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes.item(i);

    if (node.nodeType === NodeType.TEXT_NODE) {
      elements.push(renderTextNode(node));
    } else if (node.nodeType === NodeType.ELEMENT_NODE) {
      elements.push(renderElementNode(node, options));
    }
  }

  return elements;
}
