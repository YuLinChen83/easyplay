import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar, { NameFilter } from './Calendar';

const setup = (props) => {
  const enzymeWrapper = shallow(<Calendar {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

const setupNameFilter = (props) => {
  const enzymeWrapper = shallow(<NameFilter {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

const mountSetup = (props) => {
  const enzymeMountWrapper = mount(<Calendar {...props} />);
  return {
    props,
    enzymeMountWrapper,
  };
};

describe('<Calendar />', () => {
  const props = {
    plandate: {},
    preferDates: {},
    unavailableDates: [],
    names: ['A', 'B'],
    visibilityFilter: 'all',
    setVisibilityFilter: jest.fn(),
    onResult: jest.fn(),
    currentMonth: 2,
  };
  const { enzymeWrapper } = setup(props);
  it('render success', () => {
    expect(enzymeWrapper.find('NameFilter').length).toEqual(1);
    expect(enzymeWrapper.find('CalendarHeader').length).toEqual(1);
    expect(enzymeWrapper.find('CalendarDays').length).toEqual(1);
    expect(enzymeWrapper.find('CalendarCells').length).toEqual(1);
  });

  it('componentDidMount called', () => {
    enzymeWrapper.instance().componentDidMount();
    expect(props.onResult).toHaveBeenCalled();
    // expect(props.onResult.calledOnce).toBe(true);
  });

  const { enzymeMountWrapper } = mountSetup(props);
  // it('filter change', () => {
  //   const selectedName = 'LIN'; // ALL?
  //   const filterSelect = enzymeMountWrapper.find('#nameFilter');
  //   filterSelect.simulate('change', selectedName);
  //   expect(props.setVisibilityFilter).toHaveBeenCall(selectedName);
  // });

  it('set date', () => {
    enzymeMountWrapper.setState({
      currentMonth: new Date(),
      selectedDate: new Date(),
    });
    const nextMonthBtn = enzymeMountWrapper.find('#nextMonth');
    nextMonthBtn.simulate('click');
    // expect(enzymeMountWrapper.currentMonth)
  });
});

describe('NameFilter', () => {
  const props = {
    names: ['a', 'b'],
    visibilityFilter: 'ALL',
    setVisibilityFilter: jest.fn(),
  };
  const { enzymeWrapper } = setupNameFilter(props);
  it('change call fn', () => {
    const event = { target: { value: 'b' } };
    enzymeWrapper.find('#nameFilter').simulate('change', event);
    expect(props.setVisibilityFilter).toHaveBeenCalledWith(event.target.value);
  });
});

// describe('CalendarCells', () => {
//   cons
// });
