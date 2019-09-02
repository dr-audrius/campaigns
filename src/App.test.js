import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
  it('h3 tag contains text - Campaigns list', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('h3').text();
    expect(text).toEqual('Campaigns list');
  });
});