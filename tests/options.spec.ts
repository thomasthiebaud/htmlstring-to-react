import { getOptions } from '../src/options'

describe('Options', () => {
  describe('#getOptions', () => {
    it('should get default options', () => {
      const defaultOptions = getOptions()
      expect(defaultOptions).toEqual({
        dom: {
          ADD_ATTR: ['key'],
          RETURN_DOM: false,
          RETURN_DOM_FRAGMENT: true,
          RETURN_DOM_IMPORT: false,
        },
      })
    })

    it('should merge user options and default options', () => {
      const options = getOptions({
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
      })
    })

    it('should not be possible to override mandatory options set internaly by the library', () => {
      const options = getOptions({
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
      })
    })
  })
})
