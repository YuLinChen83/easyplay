const initinalState = {
  inputData: {
    name: 'Tiffany',
    preferDate: '',
    unavailableDate: '',
  },
  visibilityFilter: 'SHOW_ALL', // SHOW_ALL or Employee name
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

const prepareData = selectlist => selectlist.reduce(
  (parentPrev, parentCur) => ({
    preferDate: [...parentPrev.preferDate, parentCur.preferDate].reduce(
      (prev, cur) => prev.concat(cur),
      [],
    ),
    unavailableDate: [
      ...new Set(
        [...parentPrev.unavailableDate, parentCur.unavailableDate].reduce(
          (prev, cur) => prev.concat(cur),
          [],
        ),
      ),
    ],
  }),
  { preferDate: [], unavailableDate: [] },
);
const plandate = (state = initinalState, action) => {
  let newSelectlist;
  let objKey;
  // const { preferDate, unavailableDate } = state.selectlist.reduce(
  //   (parentPrev, parentCur) => ({
  //     preferDate: [...parentPrev.preferDate, parentCur.preferDate].reduce(
  //       (prev, cur) => prev.concat(cur),
  //       [],
  //     ),
  //     unavailableDate: [
  //       ...new Set(
  //         [...parentPrev.unavailableDate, parentCur.unavailableDate].reduce(
  //           (prev, cur) => prev.concat(cur),
  //           [],
  //         ),
  //       ),
  //     ],
  //   }),
  //   { preferDate: [], unavailableDate: [] },
  // );

  let arrPreferDate;
  let arrUnavailableDate;
  let preferDate;
  let unavailableDate;
  switch (action.type) {
    case 'INPUT_DATE':
      // console.log(state.inputData.preferDate);
      arrPreferDate = state.inputData.preferDate.split(',');
      arrUnavailableDate = state.inputData.unavailableDate.split(',');
      if (
        state.selectlist.map(item => item.name).includes(state.inputData.name)
      ) {
        // 已存在更新
        newSelectlist = state.selectlist.map(item => (item.name === state.inputData.name
          ? {
            ...item,
            preferDate: arrPreferDate,
            unavailableDate: arrUnavailableDate,
          }
          : item));
      } else {
        // 不存在新增
        newSelectlist = [
          ...state.selectlist,
          {
            ...state.inputData,
            preferDate: arrPreferDate,
            unavailableDate: arrUnavailableDate,
          },
        ];
      }
      // const { preferDate, unavailableDate } = prepareData(state.selectlist);
      ({ preferDate, unavailableDate } = prepareData(newSelectlist));
      return {
        ...state,
        selectlist: newSelectlist,
        inputData: {
          ...state.inputData,
          preferDate: '',
          unavailableDate: '',
        },
        preferDates: preferDate.reduce((prev2, cur2) => {
          // eslint-disable-next-line no-param-reassign
          prev2[cur2] = (prev2[cur2] || 0) + 1;
          // eslint-enable
          return prev2;
        }, {}),
        unavailableDates: unavailableDate,
      };
    case 'ON_FORM_CHANGE':
      // console.log(action.formData);
      objKey = action.formData.name;
      return {
        ...state,
        inputData: {
          ...state.inputData,
          [objKey]: action.formData.value,
        },
      };
    case 'SET_VISIBILITY_FILTER':
      // console.log(`SET_VISIBILITY_FILTER:${action.filter}`);
      // console.log();
      console.log(state.selectlist.find(x => x.name === action.filter));
      ({ preferDate, unavailableDate } = state.selectlist.find(
        x => x.name === action.filter,
      ));
      return {
        ...state,
        visibilityFilter: action.filter,
        preferDates: preferDate,
        unavailableDates: unavailableDate,
      };
    case 'RESULT_DATA':
      ({ preferDate, unavailableDate } = prepareData(state.selectlist));
      return {
        ...state,
        preferDates: preferDate.reduce((prev2, cur2) => {
          // eslint-disable-next-line no-param-reassign
          prev2[cur2] = (prev2[cur2] || 0) + 1;
          // eslint-enable
          return prev2;
        }, {}),
        unavailableDates: unavailableDate,
      };
    default:
      return state;
  }
};

export default plandate;
