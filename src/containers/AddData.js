import { connect } from 'react-redux';
import { inputDate, onFormChange, resultData } from '../actions';
import Form from '../components/Form';

const mapStateToProps = state => ({
  plandate: state.plandate,
  names: state.employees,
});

const mapDispatchToProps = dispatch => ({
  onFormChange: formData => dispatch(onFormChange(formData)),
  onSubmit: () => dispatch(inputDate()),
  onResult: () => dispatch(resultData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
