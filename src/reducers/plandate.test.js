import reducer from './plandate';

const initState = {
  inputData: {
    name: 'Tiffany',
    preferDate: '',
    unavailableDate: '',
  },
  visibilityFilter: 'ALL', // ALL or Employee name
  selectlist: [],
  // [
  //   {
  //     name: 'Tiffany',
  //     preferDate: ['2019-02-18', '2019-02-17', '2019-02-28'],
  //     unavailableDate: ['2019-02-13', '2019-02-14', '2019-02-27'],
  //   },
  //   {
  //     name: 'Sara',
  //     preferDate: ['2019-02-15', '2019-02-17', '2019-02-28'],
  //     unavailableDate: ['2019-02-13', '2019-02-14', '2019-02-27'],
  //   },
  //   {
  //     name: 'Tyler',
  //     preferDate: ['2019-02-15', '2019-02-17', '2019-02-28'],
  //     unavailableDate: ['2019-02-13', '2019-02-14', '2019-02-27'],
  //   },
  //   {
  //     name: 'Jack',
  //     preferDate: [
  //       '2019-02-15',
  //       '2019-02-17',
  //       '2019-02-26',
  //       '2019-02-27',
  //       '2019-02-28',
  //     ],
  //     unavailableDate: ['2019-02-13', '2019-02-14', '2019-02-27'],
  //   },
  // ]
  preferDates: {},
  unavailableDates: [],
};
describe('employeeReducer', () => {
  it('should return the initial state', () => {
    // 首先檢查使否正確建立初始state
    expect(JSON.stringify(reducer(undefined, {}))).toEqual(
      JSON.stringify(initState),
    );
  });
  // it('INPUT_DATE ', () => {
  //   expect(
  //     reducer(initinalState, {
  //       type: 'INPUT_DATE',
  //     }),
  //   ).toEqual({
  //     ...initinalState,
  //     selectlist:
  //   });
  // });

  it('ON_FORM_CHANGE', () => {
    expect(
      reducer(initState, {
        type: 'ON_FORM_CHANGE',
        formData: { name: 'name', value: 'b' },
      }),
    ).toEqual({
      ...initState,
      inputData: { ...initState.inputData, name: 'b' },
    });
  });
  it('SET_VISIBILITY_FILTER', () => {
    expect(
      reducer(initState, {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'Tiffany',
      }),
    ).toEqual({
      ...initState,
      visibilityFilter: 'Tiffany',
    });
  });
  it('RESULT_DATA', () => {
    // const testData = {
    //   inputData: { name: 'Lin', preferDate: '2019-02-10', unavailableDate: '' },
    //   preferDates: {
    //     '2019-02-15': 1,
    //     '2019-02-17': 2,
    //     '2019-02-18': 1,
    //     '2019-02-28': 2,
    //   },
    //   selectlist: [
    //     {
    //       name: 'Tiffany',
    //       preferDate: ['2019-02-18', '2019-02-17', '2019-02-28'],
    //       unavailableDate: ['2019-02-13', '2019-02-14', '2019-02-27'],
    //     },
    //     {
    //       name: 'Sara',
    //       preferDate: ['2019-02-15', '2019-02-17', '2019-02-28'],
    //       unavailableDate: ['2019-02-13', '2019-02-14', '2019-02-27'],
    //     },
    //   ],
    //   unavailableDates: ['2019-02-13', '2019-02-14', '2019-02-27'],
    //   visibilityFilter: 'Tiffany',
    // };
    expect(
      reducer(
        {
          ...initState,
          inputData: {
            name: 'Lin',
            preferDate: '2019-02-17',
            unavailableDate: '',
          },
        },
        {
          type: 'RESULT_DATA',
        },
      ),
    ).toEqual({
      ...initState,
      inputData: {
        name: 'Lin',
        preferDate: '2019-02-17',
        unavailableDate: '',
      },
    });
  });
});
