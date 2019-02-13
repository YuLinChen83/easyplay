import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import AddData from './AddData';

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
    wrapper = shallowWithStore(<AddData />, store);
  });

  describe('Name of the group', () => {
    it('names', () => {
      expect(wrapper.props().names).toEqual(initState.employees);
    });
    it('plandate', () => {
      expect(wrapper.props().plandate).toEqual(initState.plandate);
    });
  });
  describe('mapDispatchToProps', () => {
    it('onFormChange ', () => {
      const formData = { name: 'a', value: 'b' };
      wrapper.props().onFormChange(formData);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'ON_FORM_CHANGE',
        formData,
      });
    });
    it('onSubmit ', () => {
      wrapper.props().onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'INPUT_DATE',
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
