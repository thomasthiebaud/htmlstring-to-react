import getAst from '../src/ast'

describe('AST', () => {
  describe('#getAst', () => {
    it('should throw an error if the argument is not a string', (done) => {
      try {
        getAst(null)
      } catch (error) {
        done()
      }
    })

    it('should convert a string to an ast', () => {
      const ast = getAst('This is a test')
      expect(ast).toHaveLength(1)
      expect(ast[0].data).toEqual('This is a test')
      expect(ast[0].type).toEqual('text')
    })

    it('should correctly handle self closing tag', () => {
      const ast = getAst('This is <tag/> a test')
      expect(ast).toHaveLength(3)

      expect(ast[0].data).toEqual('This is ')
      expect(ast[0].type).toEqual('text')

      expect(ast[1].name).toEqual('tag')
      expect(ast[1].type).toEqual('tag')

      expect(ast[2].data).toEqual(' a test')
      expect(ast[2].type).toEqual('text')
    })

    it('should not lowercase tag and attributes names', () => {
      const ast = getAst('This is <TAG ATT="test"/> a test')
      expect(ast).toHaveLength(3)

      expect(ast[0].data).toEqual('This is ')
      expect(ast[0].type).toEqual('text')

      expect(ast[1].name).toEqual('TAG')
      expect(ast[1].attribs).toEqual({ ATT: 'test' })
      expect(ast[1].type).toEqual('tag')

      expect(ast[2].data).toEqual(' a test')
      expect(ast[2].type).toEqual('text')
    })
  })
})
