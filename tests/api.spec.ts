import * as htmldomToReact from '../src/index'

describe('Public API', () => {
  it('should export a parse function', () => {
    expect(htmldomToReact.parse).toBeDefined()
  })
})
