import { render, shallow } from 'enzyme'
import * as React from 'react'

import { renderElement, renderElements, transform } from '../src/react'

describe('React', () => {
  describe('#transform', () => {
    it('should remove event handler from attributes', () => {
      const element = {
        attribs: {
          onclick: 'wazaaa',
        },
        name: 'button',
        type: 'tag',
      }

      expect(transform(element)).toEqual({
        attribs: {},
        children: [],
        name: 'button',
        type: 'tag',
      })
    })

    it('should rename attributes to match react syntax', () => {
      const element = {
        attribs: {
          class: 'wazaaa',
          for: 'test',
        },
        name: 'button',
        type: 'tag',
      }

      expect(transform(element)).toEqual({
        attribs: {
          className: 'wazaaa',
          htmlFor: 'test',
        },
        children: [],
        name: 'button',
        type: 'tag',
      })
    })
  })

  describe('#renderElement', () => {
    it('should render a text element', () => {
      const element = {
        attribs: {},
        data: 'Test',
        type: 'text',
      }

      expect(renderElement(element)).toEqual('Test')
    })

    it('should render a tag element', () => {
      const element = {
        attribs: {},
        children: [],
        data: 'Link',
        name: 'a',
        type: 'tag',
      }
      const link = shallow(React.createElement('div', null, renderElement(element)))
      expect(link.text()).toEqual('Link')
    })

    it('should render a tag element with attributes', () => {
      const element = {
        attribs: {
          href: '#',
        },
        children: [],
        name: 'a',
        type: 'tag',
      }
      const wrapper = shallow(React.createElement('div', null, renderElement(element)))
      const link = wrapper.find('a')
      expect(link.props()).toEqual({ href: '#', children: [] })
    })

    it('should render nested tags', () => {
      const element = {
        children: [{
          children: [{
            attribs: {},
            data: 'text',
            type: 'text',
          }],
          name: 'b',
          type: 'tag',
        }],
        name: 'em',
        type: 'tag',
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
        type: '',
      }
      expect(renderElement(element)).toBeNull()
    })
  })

  describe('#renderElements', () => {
    it('should only render text and tag elements', () => {
      const elements = [{
        attribs: {},
        children: [],
        data: 'Link',
        name: 'a',
        type: '',
      }]
      expect(renderElements(elements)).toEqual([])
    })
  })
})
