import * as React from 'react';
import { render } from 'enzyme';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('');
const customWindow = dom.window;

import * as htmlStringToReact from '../src/index';

describe('Public NodeJS API', () => {
  it('should convert a string to an array of react nodes with custom window', () => {
    const elements = htmlStringToReact.parse(
      '<em key="1"><b key="2">It\' is working</b></em>',
      {},
      customWindow
    );
    const wrapper = render(React.createElement('div', null, elements));
    expect(wrapper.text()).toEqual("It' is working");
    expect(wrapper.find('em')).toHaveLength(1);
    expect(wrapper.find('b')).toHaveLength(1);
  });
});
