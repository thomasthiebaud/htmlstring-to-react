import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';

import * as htmlStringToReact from '../src/index';

describe('Public API', () => {
  it('should export a parse function', () => {
    expect(htmlStringToReact.parse).toBeDefined();
  });

  describe('#parse', () => {
    it('should ignore the input if the format is not supported', () => {
      expect(htmlStringToReact.parse(null)).toEqual([null]);
    });

    it('should convert a string to an array of react nodes', () => {
      const elements = htmlStringToReact.parse(
        '<em key="1"><b key="2">It\' is working</b></em>'
      );
      const { container } = render(React.createElement('div', null, elements));
      expect(container.querySelector('div')).toHaveTextContent(
        "It' is working"
      );
      expect(container.querySelector('em')?.childNodes).toHaveLength(1);
      expect(container.querySelector('b')?.childNodes).toHaveLength(1);
    });

    it('should override using a React element', () => {
      const spy = jest.fn();
      const elements = htmlStringToReact.parse(
        '<em key="1"><b key="2">It\' is working</b></em>',
        {
          overrides: {
            b: (props, textContent) =>
              React.createElement(
                'b',
                { onClick: spy, key: props.key },
                textContent
              ),
          },
        }
      );
      const { container } = render(React.createElement('div', null, elements));
      expect(container).toHaveTextContent("It' is working");
      expect(container.querySelectorAll('em')).toHaveLength(1);
      expect(container.querySelectorAll('em')[0].childNodes).toHaveLength(1);
      expect(container.querySelectorAll('b')).toHaveLength(1);
      expect(container.querySelectorAll('b')[0].childNodes).toHaveLength(1);
      fireEvent.click(container.querySelectorAll('b')[0]);
      expect(spy).toHaveBeenCalled();
    });

    it('should override all elements that match the selector', () => {
      const spy = jest.fn();
      const elements = htmlStringToReact.parse(
        '<b key="1">It</b> is <b key="2">working</b>',
        {
          overrides: {
            b: (props, textContent) =>
              React.createElement('b', { onClick: spy }, textContent),
          },
        }
      );
      const { container } = render(React.createElement('div', null, elements));
      expect(container).toHaveTextContent('It is working');
      expect(container.querySelectorAll('b')).toHaveLength(2);
      fireEvent.click(container.querySelectorAll('b')[0]);
      fireEvent.click(container.querySelectorAll('b')[1]);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should get textContent even on nested elements', () => {
      const spy = jest.fn();
      const elements = htmlStringToReact.parse(
        '<b key="1"><b key="2">It is working</b></b>',
        {
          overrides: {
            b: (props, textContent) =>
              React.createElement('b', { onClick: spy }, textContent),
          },
        }
      );
      const { container } = render(React.createElement('div', null, elements));
      expect(container).toHaveTextContent('It is working');
      expect(container.querySelectorAll('b')).toHaveLength(1);
      fireEvent.click(container.querySelectorAll('b')[0]);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should ignore incorrect selectors', () => {
      const spy = jest.fn();
      const elements = htmlStringToReact.parse(
        '<em key="1"><b key="2">It\' is working</b></em>',
        {
          overrides: {
            // @ts-ignore test passing invalid selector            
            span: () => null,
          },
        }
      );
      const { container } = render(React.createElement('div', null, elements));
      expect(container).toHaveTextContent("It' is working");
      expect(container.querySelectorAll('em')).toHaveLength(1);
      expect(container.querySelectorAll('b')).toHaveLength(1);
      fireEvent.click(container.querySelectorAll('b')[0]);
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});
