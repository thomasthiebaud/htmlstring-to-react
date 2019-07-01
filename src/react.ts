import * as React from 'react';
import possibleStandardNames from './possible-standard-names';

import { Config } from './config';
import { getAttributes, NodeType } from './dom';
import { EnrichedElement } from './override';

export interface AvailableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [keyof: string]: string | React.EventHandler<any> | any;

  // TODO: Add props from possibleStandardNames
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}

function transformAttributes(
  attributesMap: NamedNodeMap,
  options: Config
): AvailableProps {
  const attributes = getAttributes(attributesMap);
  const transformedAttributes: AvailableProps = {};
  Object.keys(attributes).forEach(key => {
    if (possibleStandardNames[key]) {
      transformedAttributes[possibleStandardNames[key]] = attributes[key];
    } else {
      transformedAttributes[key] = attributes[key];
    }

    if (!transformedAttributes.key) {
      const isKey = options.useAsKey.some(possibleKey => possibleKey === key);

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
  const hasChildren = element.childNodes && element.childNodes.length > 0;

  if (element.override) {
    let attributesForOverride = element.attributes;
    if (hasChildren) {
      attributesForOverride = {
        ...attributesForOverride,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        children: render(element.childNodes, options),
      };
    }
    return React.cloneElement(
      element.override(attributesForOverride, node.textContent)
    );
  }

  if (hasChildren) {
    return React.createElement(
      element.nodeName,
      element.attributes,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      render(element.childNodes, options)
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
