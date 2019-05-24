import { shallow } from 'enzyme'
import * as React from 'react'

import { render } from '../src/react'

function shallowWrapper(elements: React.ReactNode[] | React.ReactFragment) {
  return shallow(React.createElement('div', null, elements))
}

describe('React', () => {
  describe('#render', () => {
    it('should render a element node', () => {
      const div = document.createElement('div')
      const link = document.createElement('a')
      link.textContent = 'Link'
      link.setAttribute('key', 'link')
      div.appendChild(link)

      const wrapper = shallowWrapper(render(div.childNodes, { useAsKey: ['key'] }))
      expect(wrapper.find('a').text()).toEqual('Link')
    })

    it('should render a self closing element', () => {
      const div = document.createElement('div')
      const newLine = document.createElement('br')
      newLine.setAttribute('key', 'test')
      div.appendChild(newLine)

      const wrapper = shallowWrapper(render(div.childNodes, { useAsKey: ['key'] }))
      expect(wrapper.find('br')).toHaveLength(1)
    })

    it('should render a text node', () => {
      const div = document.createElement('div')
      const text = document.createTextNode('Text')
      div.appendChild(text)

      const wrapper = shallowWrapper(render(div.childNodes, { useAsKey: ['key'] }))
      expect(wrapper.text()).toEqual('Text')
    })

    it('should ignore comments', () => {
      const div = document.createElement('div')
      const comment = document.createComment('Comment')
      div.appendChild(comment)

      const wrapper = shallowWrapper(render(div.childNodes, { useAsKey: ['key'] }))
      expect(wrapper.children()).toHaveLength(0)
    })

    it('should transform attributes to match react syntax', () => {
      const div = document.createElement('div')
      const span = document.createElement('span')
      span.setAttribute('for', 'test')
      span.setAttribute('class', 'test')
      span.setAttribute('key', 'test')
      div.appendChild(span)

      const wrapper = shallowWrapper(render(div.childNodes, { useAsKey: ['key'] }))
      expect(wrapper.find('span')).toHaveLength(1)
      expect(wrapper.find('span').prop('htmlFor')).toEqual('test')
      expect(wrapper.find('span').prop('className')).toEqual('test')
      expect(wrapper.find('span').key()).toEqual('test')
    })
  })

  describe('Options', () => {
    describe('#useAsKey', () => {
      it('should use key as a default key', () => {
        const div = document.createElement('div')
        const link = document.createElement('a')
        link.textContent = 'Link'
        link.setAttribute('key', 'link')
        div.appendChild(link)

        const wrapper = shallowWrapper(render(div.childNodes, { useAsKey: ['key'] }))
        expect(wrapper.find('a').key()).toEqual('link')
      })

      it('should use other element in the list as fallback key', () => {
        const div = document.createElement('div')
        const link = document.createElement('a')
        link.textContent = 'Link'
        link.setAttribute('class', 'fallback key')
        div.appendChild(link)

        const wrapper = shallowWrapper(render(div.childNodes, { useAsKey: ['key', 'id', 'class'] }))
        expect(wrapper.find('a').key()).toEqual('fallback key')
      })

      it('should use null if no key match', () => {
        const div = document.createElement('div')
        const link = document.createElement('a')
        link.textContent = 'Link'
        div.appendChild(link)

        const wrapper = shallowWrapper(render(div.childNodes, { useAsKey: ['key', 'id'] }))
        expect(wrapper.find('a').key()).toEqual(null)
      })
    })
  })
})
