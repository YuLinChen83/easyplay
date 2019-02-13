import React from 'react';
import { shallow } from 'enzyme';

import Form from './Form';

const setup = (props) => {
  const enzymeWrapper = shallow(<Form {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

describe('<Form />', () => {
  const props = {
    onFormChange: jest.fn(),
    onSubmit: jest.fn(),
    onResult: jest.fn(),
    plandate: {
      inputData: {},
    },
    names: ['aa', 'bb'],
  };
  const { enzymeWrapper } = setup(props);
  it('render success', () => {
    expect(enzymeWrapper).toHaveLength(1);
  });

  it('click test ', () => {
    enzymeWrapper
      .find('#sumbit')
      .get(0)
      .props.onClick();
    expect(props.onSubmit).toHaveBeenCalled();
  });

  it('result button ckick', () => {
    const button = enzymeWrapper.find('#result');
    button.simulate('click');
    expect(props.onResult).toHaveBeenCalled();
  });

  it('input name', () => {
    const event = { target: { name: 'aaa', value: 'bbb' } };
    const input = enzymeWrapper.find('#name');
    input.simulate('change', event);
    expect(props.onFormChange).toHaveBeenCalledWith(event.target);
  });

  it('input preferDate', () => {
    const event = { target: { name: 'aaa', value: 'bbb' } };
    const input = enzymeWrapper.find('#preferDate');
    input.simulate('change', event);
    expect(props.onFormChange).toHaveBeenCalledWith(event.target);
  });

  it('input unavailableDate', () => {
    const event = { target: { name: 'aaa', value: 'bbb' } };
    const input = enzymeWrapper.find('#unavailableDate');
    input.simulate('change', event);
    expect(props.onFormChange).toHaveBeenCalledWith(event.target);
  });
});
