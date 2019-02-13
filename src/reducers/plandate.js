const initinalState = {
  inputData: {
    name: 'Tiffany',
    preferDate: '',
    unavailableDate: '',
  },
  visibilityFilter: 'ALL', // ALL or Employee name
  selectlist: [
    {
      name: 'Tiffany',
      preferDate: ['2019-02-18', '2019-02-17', '2019-02-28'],
      unavailableDate: ['2019-02-13', '2019-02-14', '2019-02-27'],
    },
    {
      name: 'Sara',
      preferDate: ['2019-02-15', '2019-02-17', '2019-02-28'],
      unavailableDate: ['2019-02-13', '2019-02-14', '2019-02-27'],
    },
    {
      name: 'Tyler',
      preferDate: ['2019-02-15', '2019-02-17', '2019-02-28'],
      unavailableDate: ['2019-02-13', '2019-02-14', '2019-02-27'],
    },
    {
      name: 'Jack',
      preferDate: [
        '2019-02-15',
        '2019-02-17',
        '2019-02-26',
        '2019-02-27',
        '2019-02-28',
      ],
      unavailableDate: ['2019-02-13', '2019-02-14', '2019-02-27'],
    },
  ],
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
const strToArr = str => str.split(',').map(item => item.trim());
const plandate = (state = initinalState, action) => {
  let newSelectlist;
  let objKey;
  let arrPreferDate;
  let arrUnavailableDate;
  let preferDate;
  let unavailableDate;
  switch (action.type) {
    case 'INPUT_DATE':
      arrPreferDate = strToArr(state.inputData.preferDate);
      arrUnavailableDate = strToArr(state.inputData.unavailableDate);
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
      objKey = action.formData.name;
      return {
        ...state,
        inputData: {
          ...state.inputData,
          [objKey]: action.formData.value,
        },
      };
    case 'SET_VISIBILITY_FILTER':
      // newSelectlist = state.selectlist.filter(
      //   item => item.name === action.filter,
      // );
      // ({ preferDate, unavailableDate } = prepareData(
      //   action.filter === 'ALL' ? state.selectlist : newSelectlist,
      // ));
      return {
        ...state,
        visibilityFilter: action.filter,
        // preferDates: preferDate.reduce((prev2, cur2) => {
        //   // eslint-disable-next-line no-param-reassign
        //   prev2[cur2] = (prev2[cur2] || 0) + 1;
        //   // eslint-enable
        //   return prev2;
        // }, {}),
        // unavailableDates: unavailableDate,
      };
    case 'RESULT_DATA':
      ({ preferDate, unavailableDate } = prepareData(state.selectlist));
      // console.log(
      //   JSON.stringify({
      //     ...state,
      //     preferDates: preferDate.reduce((prev2, cur2) => {
      //       // eslint-disable-next-line no-param-reassign
      //       prev2[cur2] = (prev2[cur2] || 0) + 1;
      //       // eslint-enable
      //       return prev2;
      //     }, {}),
      //     unavailableDates: unavailableDate,
      //   }),
      // );
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
