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

    it('should accept event handlers', () => {
      const spy = jest.fn()
      const elements = htmlStringToReact.parse('<em key="1"><b key="2">It\' is working</b></em>', {
        eventHandlers: {
          b: {
            onClick: spy,
          },
        },
      })
      const wrapper = shallow(React.createElement('div', null, elements))
      expect(wrapper.text()).toEqual('It\' is working')
      expect(wrapper.find('em')).toHaveLength(1)
      expect(wrapper.find('b')).toHaveLength(1)
      expect(wrapper.find('b').simulate('click'))
      expect(spy).toHaveBeenCalled()
    })

    it('should ignore incorrect event handlers', () => {
      const spy = jest.fn()
      const elements = htmlStringToReact.parse('<em key="1"><b key="2">It\' is working</b></em>', {
        eventHandlers: {
          b: {
            onclick: spy,
          },
        },
      })
      const wrapper = shallow(React.createElement('div', null, elements))
      expect(wrapper.text()).toEqual('It\' is working')
      expect(wrapper.find('em')).toHaveLength(1)
      expect(wrapper.find('b')).toHaveLength(1)
      expect(wrapper.find('b').simulate('click'))
      expect(spy).toHaveBeenCalledTimes(0)
    })

    it('should ignore incorrect selectors', () => {
      const spy = jest.fn()
      const elements = htmlStringToReact.parse('<em key="1"><b key="2">It\' is working</b></em>', {
        eventHandlers: {
          span: {
            onClick: spy,
          },
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
