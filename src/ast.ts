export interface Attributes { [keyof: string]: string }

export interface ASTElement {
  attributes?: Attributes
  children?: ASTElement[]
  name: string | null
  type: NodeType
  value: string | null
}

// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
export enum NodeType {
  ELEMENT_NODE = 1,
  TEXT_NODE = 3,
  PROCESSING_INSTRUCTION_NODE = 7,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9,
  DOCUMENT_TYPE_NODE = 10,
  DOCUMENT_FRAGMENT_NODE = 11,
}

function getAttributes(elementAttributes: NamedNodeMap) {
  const attributes: Attributes = {}
  for (let i = 0; i < elementAttributes.length; i++) {
      const attribute = elementAttributes.item(i)
      attributes[attribute.nodeName] = attribute.nodeValue
  }
  return attributes
}

function nodeToElement(node: Node): ASTElement {
  if (node.nodeType === NodeType.ELEMENT_NODE) {
    const element = node as Element
    return {
      attributes: getAttributes(element.attributes),
      children: nodesToElement(element.childNodes),
      name: element.nodeName,
      type: element.nodeType,
      value: element.nodeValue,
    }
  } else if (node.nodeType === NodeType.TEXT_NODE) {
    return {
      children: nodesToElement(node.childNodes),
      name: node.nodeName,
      type: node.nodeType,
      value: node.nodeValue,
    }
  }

  return null
}

function nodesToElement(nodes: NodeListOf<Node & ChildNode>): ASTElement[] {
  const elements: ASTElement[] = []

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes.item(i)
    const element = nodeToElement(node)

    if (element) {
      elements.push(element)
    }
  }
  return elements
}

export default function getAst(html: string): ASTElement[] {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.')
  }

  const parser = new DOMParser()
  const document = parser.parseFromString(`<htmldomtoreactroot>${html}</htmldomtoreactroot>`, 'application/xml')

  const astFromRoot = nodesToElement(document.childNodes)
  return astFromRoot[0].children
}
