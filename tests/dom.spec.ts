import { getConfig } from '../src/config';
import { parse } from '../src/dom';

describe('DOM', () => {
  describe('#parse', () => {
    it('should sanitize input', () => {
      const document = parse(
        'This is a <a onclick="console.log("WAZAAAA")">test</a> <script/>',
        getConfig()
      );
      const children = document.childNodes;
      expect(children.length).toEqual(3);
      expect(children.item(0).textContent).toEqual('This is a ');

      const link = children.item(1) as Element;
      expect(link.nodeName).toEqual('A');
      expect(link.textContent).toEqual('test');
      expect(link.getAttribute('onclick')).toBeNull();

      expect(children.item(2).textContent).toEqual(' ');
    });
  });
});
