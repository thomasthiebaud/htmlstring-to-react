import '@testing-library/jest-dom';
import { render as testRender } from '@testing-library/react';
import * as React from 'react';

import { render } from '../src/react';

function testWrapper(elements: React.ReactNode[] | React.ReactFragment) {
  return testRender(React.createElement('div', null, elements));
}

describe('React', () => {
  describe('#render', () => {
    it('should render a element node', () => {
      const div = document.createElement('div');
      const link = document.createElement('a');
      link.textContent = 'Link';
      link.setAttribute('key', 'link');
      div.appendChild(link);

      const { container } = testWrapper(
        render(div.childNodes, { useAsKey: ['key'] })
      );
      expect(container.querySelector('a')).toHaveTextContent('Link');
    });

    it('should render a self closing element', () => {
      const div = document.createElement('div');
      const newLine = document.createElement('br');
      newLine.setAttribute('key', 'test');
      div.appendChild(newLine);

      const { container } = testWrapper(
        render(div.childNodes, { useAsKey: ['key'] })
      );
      expect(container.querySelectorAll('br')).toHaveLength(1);
    });

    it('should render a text node', () => {
      const div = document.createElement('div');
      const text = document.createTextNode('Text');
      div.appendChild(text);

      const { container } = testWrapper(
        render(div.childNodes, { useAsKey: ['key'] })
      );
      expect(container).toHaveTextContent('Text');
    });

    it('should ignore comments', () => {
      const div = document.createElement('div');
      const comment = document.createComment('Comment');
      div.appendChild(comment);

      const nodes = render(div.childNodes, { useAsKey: ['key'] });
      const elems: React.ReactElement[] = [];

      for (const node of nodes) {
        if (React.isValidElement(node)) {
          elems.push(node);
        }
      }
      expect(elems).toHaveLength(0);
    });

    it('should transform attributes to match react syntax', () => {
      const div = document.createElement('div');
      const span = document.createElement('span');
      span.setAttribute('for', 'test');
      span.setAttribute('class', 'test');
      span.setAttribute('key', 'test');
      div.appendChild(span);

      const nodes = render(div.childNodes, { useAsKey: ['key'] });
      const elems: React.ReactElement[] = [];

      for (const node of nodes) {
        if (React.isValidElement(node)) {
          elems.push(node);
        }
      }
      expect(elems).toHaveLength(1);
      expect(elems[0].type).toEqual('span');
      expect(elems[0].props.htmlFor).toEqual('test');
      expect(elems[0].props.className).toEqual('test');
      expect(elems[0].key).toEqual('test');
    });
  });

  describe('Options', () => {
    describe('#useAsKey', () => {
      it('should use key as a default key', () => {
        const div = document.createElement('div');
        const link = document.createElement('a');
        link.textContent = 'Link';
        link.setAttribute('key', 'link');
        div.appendChild(link);

        const nodes = render(div.childNodes, { useAsKey: ['key'] });
        const elems: React.ReactElement[] = [];

        for (const node of nodes) {
          if (React.isValidElement(node)) {
            elems.push(node);
          }
        }
        expect(elems).toHaveLength(1);
        expect(elems[0].type).toEqual('a');
        expect(elems[0].key).toEqual('link');
      });

      it('should use other element in the list as fallback key', () => {
        const div = document.createElement('div');
        const link = document.createElement('a');
        link.textContent = 'Link';
        link.setAttribute('class', 'fallback key');
        div.appendChild(link);

        const nodes = render(div.childNodes, {
          useAsKey: ['key', 'id', 'class'],
        });
        const elems: React.ReactElement[] = [];

        for (const node of nodes) {
          if (React.isValidElement(node)) {
            elems.push(node);
          }
        }
        expect(elems).toHaveLength(1);
        expect(elems[0].type).toEqual('a');
        expect(elems[0].key).toEqual('fallback key');
      });

      it('should use null if no key match', () => {
        const div = document.createElement('div');
        const link = document.createElement('a');
        link.textContent = 'Link';
        div.appendChild(link);

        const nodes = render(div.childNodes, { useAsKey: ['key', 'id'] });
        const elems: React.ReactElement[] = [];

        for (const node of nodes) {
          if (React.isValidElement(node)) {
            elems.push(node);
          }
        }
        expect(elems).toHaveLength(1);
        expect(elems[0].type).toEqual('a');
        expect(elems[0].key).toEqual(null);
      });
    });
  });
});
