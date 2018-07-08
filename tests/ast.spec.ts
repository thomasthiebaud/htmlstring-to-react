import getAst, { NodeType } from '../src/ast'

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
      expect(ast[0].value).toEqual('This is a test')
      expect(ast[0].type).toEqual(NodeType.TEXT_NODE)
    })

    it('should correctly handle self closing tag', () => {
      const ast = getAst('This is <tag/> a test')
      expect(ast).toHaveLength(3)

      expect(ast[0].value).toEqual('This is ')
      expect(ast[0].type).toEqual(NodeType.TEXT_NODE)

      expect(ast[1].name).toEqual('tag')
      expect(ast[1].type).toEqual(NodeType.ELEMENT_NODE)

      expect(ast[2].value).toEqual(' a test')
      expect(ast[2].type).toEqual(NodeType.TEXT_NODE)
    })

    it('should not lowercase tag and attributes names', () => {
      const ast = getAst('This is <TAG ATT="test"/> a test')
      expect(ast).toHaveLength(3)

      expect(ast[0].value).toEqual('This is ')
      expect(ast[0].type).toEqual(NodeType.TEXT_NODE)

      expect(ast[1].name).toEqual('TAG')
      expect(ast[1].attributes).toEqual({ ATT: 'test' })
      expect(ast[1].type).toEqual(NodeType.ELEMENT_NODE)

      expect(ast[2].value).toEqual(' a test')
      expect(ast[2].type).toEqual(NodeType.TEXT_NODE)
    })

    it('should ignore comments', () => {
      const ast = getAst('This is a <!-- comment -->')
      expect(ast).toHaveLength(1)
      expect(ast[0].value).toEqual('This is a ')
      expect(ast[0].type).toEqual(NodeType.TEXT_NODE)
    })
  })
})
