import fs from 'fs';
import React from 'react';
import { render, shallow, ShallowWrapper } from 'enzyme';

import * as htmlStringToReact from '../src/index';
import exampleHTML from './assets/index.html';

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
      const wrapper = render(React.createElement('div', null, elements));
      expect(wrapper.text()).toEqual("It' is working");
      expect(wrapper.find('em')).toHaveLength(1);
      expect(wrapper.find('b')).toHaveLength(1);
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
      const wrapper = shallow(React.createElement('div', null, elements));
      expect(wrapper.text()).toEqual("It' is working");
      expect(wrapper.find('em')).toHaveLength(1);
      expect(wrapper.find('b')).toHaveLength(1);
      expect(wrapper.find('b').key()).toEqual('2');
      expect(wrapper.find('b').simulate('click'));
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
      const wrapper = shallow(React.createElement('div', null, elements));
      expect(wrapper.text()).toEqual('It is working');
      expect(wrapper.find('b')).toHaveLength(2);
      expect(
        wrapper
          .find('b')
          .at(0)
          .key()
      ).toBeNull();
      expect(
        wrapper
          .find('b')
          .at(1)
          .key()
      ).toBeNull();
      expect(
        wrapper
          .find('b')
          .at(0)
          .simulate('click')
      );
      expect(
        wrapper
          .find('b')
          .at(1)
          .simulate('click')
      );
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
      const wrapper = shallow(React.createElement('div', null, elements));
      expect(wrapper.text()).toEqual('It is working');
      expect(wrapper.find('b')).toHaveLength(1);
      expect(
        wrapper
          .find('b')
          .at(0)
          .key()
      ).toBeNull();
      expect(
        wrapper
          .find('b')
          .at(0)
          .simulate('click')
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should ignore incorrect selectors', () => {
      const spy = jest.fn();
      const elements = htmlStringToReact.parse(
        '<em key="1"><b key="2">It\' is working</b></em>',
        {
          overrides: {
            span: () => null,
          },
        }
      );
      const wrapper = shallow(React.createElement('div', null, elements));
      expect(wrapper.text()).toEqual("It' is working");
      expect(wrapper.find('em')).toHaveLength(1);
      expect(wrapper.find('b')).toHaveLength(1);
      expect(wrapper.find('b').simulate('click'));
      expect(spy).toHaveBeenCalledTimes(0);
    });

    describe('with nested overrides', () => {
      let elementsTree: ShallowWrapper;
      beforeEach(() => {
        const elements = htmlStringToReact.parse(exampleHTML, {
          dom: {
            ALLOWED_TAGS: ['main', 'section', 'p', 'span', 'b'],
            ADD_TAGS: [],
          },
          overrides: {
            'p.warning-content-only': (props, textContent) => (
              <p className={props.className}>{textContent}</p>
            ),
            'p.warning-with-children': props => (
              <p className={props.className}>{props.children}</p>
            ),
            b: props => <b>{props.children}</b>,
          },
        });
        elementsTree = shallow(<div>{elements}</div>);
        console.log(elementsTree);
      });

      it('should remove nested elements if textContent argument is used as a child', () => {
        const pWithTextContentOnly = elementsTree.find(
          'p.warning-content-only'
        );
        expect(pWithTextContentOnly.find('b')).toHaveLength(0);
      });

      it('should render nested elements if props.children is used as a child', () => {
        const pWithChildren = elementsTree.find('p.warning-with-children');
        expect(pWithChildren.find('b')).toHaveLength(2);
      });
    });
  });
});
