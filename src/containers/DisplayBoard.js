import { connect } from 'react-redux';
import { setVisibilityFilter, resultData } from '../actions';
import Calendar from '../components/Calendar';

const prepareData = (selectlist) => {
  //   const aaa = selectlist.reduce(
  //     (parentPrev, parentCur) => ({
  //       preferDate: [...parentPrev.preferDate, parentCur.preferDate].reduce(
  //         (prev, cur) => prev.concat(cur),
  //         [],
  //       ).reduce((prev2, cur2) => {
  //         // eslint-disable-next-line no-param-reassign
  //         prev2[cur2] = (prev2[cur2] || 0) + 1;
  //         // eslint-enable
  //         return prev2;
  //       }, {}),
  //       unavailableDate: [
  //         ...new Set(
  //           [...parentPrev.unavailableDate, parentCur.unavailableDate].reduce(
  //             (prev, cur) => prev.concat(cur),
  //             [],
  //           ),
  //         ),
  //       ],
  //     }),
  //     { preferDate: [], unavailableDate: [] },
  //   );
  // return aaa;

  const step1 = selectlist.reduce(
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
  return {
    ...step1,
    preferDate: step1.preferDate.reduce((prev2, cur2) => {
      // eslint-disable-next-line no-param-reassign
      prev2[cur2] = (prev2[cur2] || 0) + 1;
      // eslint-enable
      return prev2;
    }, {}),
  };
};
// const generatePreferDates = (selectList) => {
//   const { preferDate } = prepareData(selectList);
//   return preferDate.reduce((prev2, cur2) => {
//     // eslint-disable-next-line no-param-reassign
//     prev2[cur2] = (prev2[cur2] || 0) + 1;
//     // eslint-enable
//     return prev2;
//   }, {});
// };

const filterData = (filter, selectList) => {
  const { preferDate, unavailableDate } = prepareData(
    filter === 'ALL'
      ? selectList
      : selectList.filter(item => item.name === filter),
  );
  return { preferDate, unavailableDate };
};

const mapStateToProps = state => ({
  plandate: state.plandate.selectlist,
  names: state.employees,
  filterData: filterData(
    state.plandate.visibilityFilter,
    state.plandate.selectlist,
  ),
  // preferDates: filterData(state.plandate.filter, state.plandate.selectlist)
  //   .preferDates, // generatePreferDates(state.plandate.selectlist),
  // unavailableDates: filterData(state.plandate.filter, state.plandate.selectlist)
  // .unavailableDate,
  visibilityFilter: state.plandate.visibilityFilter,
});

const mapDispatchToProps = dispatch => ({
  setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
  onResult: () => dispatch(resultData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar);
