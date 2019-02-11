import { connect } from 'react-redux';
import { setVisibilityFilter, resultData } from '../actions';
import Calendar from '../components/Calendar';

const mapStateToProps = state => ({
  plandate: state.plandate.selectlist,
  names: state.employees,
  preferDates: state.plandate.preferDates,
  unavailableDates: state.plandate.unavailableDates,
});

const mapDispatchToProps = dispatch => ({
  setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
  onResult: () => dispatch(resultData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar);
