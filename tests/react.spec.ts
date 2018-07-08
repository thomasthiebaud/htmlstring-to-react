import { render, shallow } from 'enzyme'
import * as React from 'react'

import { NodeType } from '../src/ast'
import { renderElement, renderElements, transform } from '../src/react'

describe('React', () => {
  describe('#transform', () => {
    it('should remove event handler from attributes', () => {
      const element = {
        attributes: {
          onclick: 'wazaaa',
        },
        name: 'button',
        type: NodeType.ELEMENT_NODE,
        value: null,
      }

      expect(transform(element)).toEqual({
        attributes: {},
        children: [],
        name: 'button',
        type: NodeType.ELEMENT_NODE,
        value: null,
      })
    })

    it('should rename attributes to match react syntax', () => {
      const element = {
        attributes: {
          class: 'wazaaa',
          for: 'test',
        },
        name: 'button',
        type: NodeType.ELEMENT_NODE,
        value: null,
      }

      expect(transform(element)).toEqual({
        attributes: {
          className: 'wazaaa',
          htmlFor: 'test',
        },
        children: [],
        name: 'button',
        type: NodeType.ELEMENT_NODE,
        value: null,
      })
    })
  })

  describe('#renderElement', () => {
    it('should render a text element', () => {
      const element = {
        name: '#text',
        type: NodeType.TEXT_NODE,
        value: 'Test',
      }

      expect(renderElement(element)).toEqual('Test')
    })

    it('should render a tag element', () => {
      const element = {
        attributes: {},
        children: [],
        name: 'a',
        type: NodeType.ELEMENT_NODE,
        value: 'Link',
      }
      const link = shallow(React.createElement('div', null, renderElement(element)))
      expect(link.text()).toEqual('Link')
    })

    it('should render a tag element with attributes', () => {
      const element = {
        attributes: {
          href: '#',
        },
        children: [],
        name: 'a',
        type: NodeType.ELEMENT_NODE,
        value: null,
      }
      const wrapper = shallow(React.createElement('div', null, renderElement(element)))
      const link = wrapper.find('a')
      expect(link.props()).toEqual({ href: '#', children: [] })
    })

    it('should render nested tags', () => {
      const element = {
        children: [{
          children: [{
            name: '#text',
            type: NodeType.TEXT_NODE,
            value: 'text',
          }],
          name: 'b',
          type: NodeType.ELEMENT_NODE,
          value: null,
        }],
        name: 'em',
        type: NodeType.ELEMENT_NODE,
        value: null,
      }
      const nested = render(React.createElement('div', null, renderElement(element)))

      const em = nested.find('em')
      expect(em).toBeDefined()

      const b = nested.find('b')
      expect(b).toBeDefined()

      const text = b.text()
      expect(text).toEqual('text')
    })

    it('should ignore unknown type', () => {
      const element = {
        name: 'em',
        type: -1,
        value: null,
      }
      expect(renderElement(element)).toBeNull()
    })
  })

  describe('#renderElements', () => {
    it('should only render text and tag elements', () => {
      const elements = [{
        name: 'a',
        type: -1,
        value: 'Link',
      }]
      expect(renderElements(elements)).toEqual([])
    })
  })
})
