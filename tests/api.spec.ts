import { render, shallow } from 'enzyme'
import * as React from 'react'

import * as htmlStringToReact from '../src/index'

describe('Public API', () => {
  it('should export a parse function', () => {
    expect(htmlStringToReact.parse).toBeDefined()
  })

  describe('#parse', () => {
    it('should throw an error if the first parameter is not a string', (done) => {
      try {
        htmlStringToReact.parse(null)
      } catch (err) {
        done()
      }
    })

    it('should convert a string to an array of react nodes', () => {
      const elements = htmlStringToReact.parse('<em key="1"><b key="2">It\' is working</b></em>')
      const wrapper = render(React.createElement('div', null, elements))
      expect(wrapper.text()).toEqual('It\' is working')
      expect(wrapper.find('em')).toHaveLength(1)
      expect(wrapper.find('b')).toHaveLength(1)
    })

    it('should override using a React element', () => {
      const spy = jest.fn()
      const elements = htmlStringToReact.parse('<em key="1"><b key="2">It\' is working</b></em>', {
        overrides: {
          b: (props, textContent) => React.createElement('b', { onClick: spy, key: props.key }, textContent),
        },
      })
      const wrapper = shallow(React.createElement('div', null, elements))
      expect(wrapper.text()).toEqual('It\' is working')
      expect(wrapper.find('em')).toHaveLength(1)
      expect(wrapper.find('b')).toHaveLength(1)
      expect(wrapper.find('b').key()).toEqual('2')
      expect(wrapper.find('b').simulate('click'))
      expect(spy).toHaveBeenCalled()
    })

    it('should override all elements that match the selector', () => {
      const spy = jest.fn()
      const elements = htmlStringToReact.parse('<b key="1">It</b> is <b key="2">working</b>', {
        overrides: {
          b: (props, textContent) => React.createElement('b', { onClick: spy }, textContent),
        },
      })
      const wrapper = shallow(React.createElement('div', null, elements))
      expect(wrapper.text()).toEqual('It is working')
      expect(wrapper.find('b')).toHaveLength(2)
      expect(wrapper.find('b').at(0).key()).toBeNull()
      expect(wrapper.find('b').at(1).key()).toBeNull()
      expect(wrapper.find('b').at(0).simulate('click'))
      expect(wrapper.find('b').at(1).simulate('click'))
      expect(spy).toHaveBeenCalledTimes(2)
    })

    it('should get textContent even on nested elements', () => {
      const spy = jest.fn()
      const elements = htmlStringToReact.parse('<b key="1"><b key="2">It is working</b></b>', {
        overrides: {
          b: (props, textContent) => React.createElement('b', { onClick: spy }, textContent),
        },
      })
      const wrapper = shallow(React.createElement('div', null, elements))
      expect(wrapper.text()).toEqual('It is working')
      expect(wrapper.find('b')).toHaveLength(1)
      expect(wrapper.find('b').at(0).key()).toBeNull()
      expect(wrapper.find('b').at(0).simulate('click'))
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should ignore incorrect selectors', () => {
      const spy = jest.fn()
      const elements = htmlStringToReact.parse('<em key="1"><b key="2">It\' is working</b></em>', {
        overrides: {
          span: () => null,
        },
      })
      const wrapper = shallow(React.createElement('div', null, elements))
      expect(wrapper.text()).toEqual('It\' is working')
      expect(wrapper.find('em')).toHaveLength(1)
      expect(wrapper.find('b')).toHaveLength(1)
      expect(wrapper.find('b').simulate('click'))
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })
})
