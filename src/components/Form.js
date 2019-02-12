import React from 'react';
// import PropTypes from 'prop-types'
const mockData = [
  {
    name: 'Tiffany',
    preferDate: '2019-02-10, 2019-02-18, 2019-02-17, 2019-02-28',
    unavailableDate: '2019-02-27',
  },
  {
    name: 'Sara',
    preferDate: '2019-02-18, 2019-02-17, 2019-02-27',
    unavailableDate: '2019-02-12, 2019-02-14, 2019-02-27',
  },
  {
    name: 'Tyler',
    preferDate: '',
    unavailableDate: '2019-02-14, 2019-02-27',
  },
  {
    name: 'Jack',
    preferDate: '2019-02-17, 2019-02-28',
    unavailableDate: '2019-02-12',
  },
  {
    name: 'Ben',
    preferDate: '2019-02-04, 2019-02-17, 2019-02-28',
    unavailableDate: '2019-02-12, 2019-02-14, 2019-02-27',
  },
  {
    name: 'Chole',
    preferDate: '2019-02-17, 2019-02-25',
    unavailableDate: '2019-02-14, 2019-02-27',
  },
];
class Form extends React.Component {
  componentDidMount() {
    const { onFormChange, onSubmit } = this.props;
    mockData.forEach((user) => {
      onFormChange({
        name: 'name',
        value: user.name,
      });
      onFormChange({
        name: 'preferDate',
        value: user.preferDate,
      });
      onFormChange({
        name: 'unavailableDate',
        value: user.unavailableDate,
      });
      onSubmit();
    });
  }

  render() {
    const {
      names, plandate, onSubmit, onResult, onFormChange,
    } = this.props;
    return (
      <div>
        <label htmlFor="name">
          建立者
          <select
            id="name"
            name="name"
            value={plandate.inputData.name}
            onChange={e => onFormChange(e.target.name, e.target.value)}
          >
            {names.map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="preferDate">
          優先日期
          <input
            id="preferDate"
            name="preferDate"
            type="text"
            value={plandate.inputData.preferDate}
            onChange={e => onFormChange(e.target.name, e.target.value)}
          />
        </label>
        <label htmlFor="unavailableDate">
          排除日期
          <input
            id="unavailableDate"
            name="unavailableDate"
            type="text"
            value={plandate.inputData.unavailableDate}
            onChange={e => onFormChange(e.target.name, e.target.value)}
          />
        </label>
        <button type="submit" onClick={() => onSubmit()}>
          提交
        </button>
        <button type="button" onClick={() => onResult()}>
          結果
        </button>
      </div>
    );
  }
}

export default Form;
