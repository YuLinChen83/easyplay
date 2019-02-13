import React from 'react';
import { shallow } from 'enzyme';

import Form from './Form';

function setup() {
  const props = {
    addTodo: jest.fn(),
  };

  const enzymeWrapper = shallow(<Form {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('<Form />', () => {
  it('render success', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).toHaveLength(1);
  });
});
