import { render, shallow } from 'enzyme'
import * as React from 'react'

import * as htmldomToReact from '../src/index'

describe('Public API', () => {
  it('should export a parse function', () => {
    expect(htmldomToReact.parse).toBeDefined()
  })

  describe('#parse', () => {
    it('should convert a string to an array of react nodes', () => {
      const elements = htmldomToReact.parse('<em><b>It\' is working</b></em>')
      const wrapper = render(React.createElement('div', null, elements))
      expect(wrapper.text()).toEqual('It\' is working')
      expect(wrapper.find('em')).toHaveLength(1)
      expect(wrapper.find('b')).toHaveLength(1)
    })
  })
})
