import * as dompurify from 'dompurify';

import { Config } from './config';

export enum NodeType {
  ELEMENT_NODE = 1,
  TEXT_NODE = 3,
  PROCESSING_INSTRUCTION_NODE = 7,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9,
  DOCUMENT_TYPE_NODE = 10,
  DOCUMENT_FRAGMENT_NODE = 11,
}

export function getAttributes(elementAttributes: NamedNodeMap) {
  const attributes: { [keyof: string]: string } = {};
  for (let i = 0; i < elementAttributes.length; i++) {
    const attribute = elementAttributes.item(i);
    attributes[attribute.nodeName] = attribute.nodeValue;
  }
  return attributes;
}

export function parse(html: string, config: Config): DocumentFragment {
  return dompurify.sanitize(html, config.dom) as unknown as DocumentFragment;
}
