import { connect } from 'react-redux';
import { setVisibilityFilter, resultData } from '../actions';
import Calendar from '../components/Calendar';

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
const generatePreferDates = (selectList) => {
  const { preferDate } = prepareData(selectList);
  return preferDate.reduce((prev2, cur2) => {
    // eslint-disable-next-line no-param-reassign
    prev2[cur2] = (prev2[cur2] || 0) + 1;
    // eslint-enable
    return prev2;
  }, {});
};

const mapStateToProps = state => ({
  plandate: state.plandate.selectlist,
  names: state.employees,
  preferDates: generatePreferDates(state.plandate.selectlist),
  unavailableDates: state.plandate.unavailableDates,
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
