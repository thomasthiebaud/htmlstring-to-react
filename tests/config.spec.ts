import { getConfig } from '../src/config'

describe('Options', () => {
  describe('#getOptions', () => {
    it('should get default options', () => {
      const defaultOptions = getConfig()
      expect(defaultOptions).toEqual({
        dom: {
          ADD_ATTR: ['key'],
          RETURN_DOM: false,
          RETURN_DOM_FRAGMENT: true,
          RETURN_DOM_IMPORT: false,
        },
        generatesKeys: false,
      })
    })

    it('should merge user options and default options', () => {
      const options = getConfig({
        dom: {
          ADD_TAGS: ['script'],
        },
      })
      expect(options).toEqual({
        dom: {
          ADD_ATTR: ['key'],
          ADD_TAGS: ['script'],
          RETURN_DOM: false,
          RETURN_DOM_FRAGMENT: true,
          RETURN_DOM_IMPORT: false,
        },
        generatesKeys: false,
      })
    })

    it('should not be possible to override mandatory options set internaly by the library', () => {
      const options = getConfig({
        dom: {
          RETURN_DOM_FRAGMENT: false,
        },
      })
      expect(options).toEqual({
        dom: {
          ADD_ATTR: ['key'],
          RETURN_DOM: false,
          RETURN_DOM_FRAGMENT: true,
          RETURN_DOM_IMPORT: false,
        },
        generatesKeys: false,
      })
    })
  })
})
