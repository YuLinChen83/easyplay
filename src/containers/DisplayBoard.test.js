import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import DisplayBoard from './DisplayBoard';

const mockStore = configureStore();

const shallowWithStore = (component, store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
};

const initState = {
  plandate: {
    inputData: {
      name: 'Tiffany',
      preferDate: '',
      unavailableDate: '',
    },
    visibilityFilter: 'ALL', // ALL or Employee name
    selectlist: [],
    preferDates: {},
    unavailableDates: [],
  },
  employees: ['Tiffany', 'Sara', 'Tyler', 'Jack', 'Ben', 'Chole'],
};

describe('Name of the group', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initState);
    store.dispatch = jest.fn();
    wrapper = shallowWithStore(<DisplayBoard />, store);
  });
  describe('mapStateToProps', () => {
    it('names', () => {
      console.log(wrapper.props());
      expect(wrapper.props().names).toEqual(initState.employees);
    });
    it('plandate', () => {
      expect(wrapper.props().plandate).toEqual(initState.plandate.selectlist);
    });
    it('preferDates', () => {
      expect(wrapper.props().preferDates).toEqual(
        initState.plandate.preferDates,
      );
    });
    it('unavailableDates', () => {
      expect(wrapper.props().unavailableDates).toEqual(
        initState.plandate.unavailableDates,
      );
    });
    it('visibilityFilter', () => {
      expect(wrapper.props().visibilityFilter).toEqual(
        initState.plandate.visibilityFilter,
      );
    });
  });

  describe('mapDispatchToProps', () => {
    it('setVisibilityFilter ', () => {
      const filter = 'Tiffany';
      wrapper.props().setVisibilityFilter(filter);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'SET_VISIBILITY_FILTER',
        filter,
      });
    });
    it('onResult ', () => {
      wrapper.props().onResult();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'RESULT_DATA',
      });
    });
  });
});
