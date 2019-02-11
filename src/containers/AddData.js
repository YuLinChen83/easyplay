import { connect } from 'react-redux'
import { addDate } from '../actions'
import Form from '../components/Form'

const mapStateToProps = (state) => ({
    plandate: state.plandate,
    names: state.employees
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (addItem) => dispatch(addDate(addItem))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)