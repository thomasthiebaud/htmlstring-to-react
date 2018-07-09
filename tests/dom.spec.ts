import { parse } from '../src/dom'
import { getOptions } from '../src/options'

describe('DOM', () => {
  describe('#parse', () => {
    it('should sanitize input', () => {
      const document = parse('This is a <a onclick="console.log(\"WAZAAAA\")">test</a> <script/>', getOptions())
      expect(document.length).toEqual(3)
      expect(document.item(0).textContent).toEqual('This is a ')

      const link = document.item(1) as Element
      expect(link.nodeName).toEqual('A')
      expect(link.textContent).toEqual('test')
      expect(link.getAttribute('onclick')).toBeNull()

      expect(document.item(2).textContent).toEqual(' ')
    })
  })
})
