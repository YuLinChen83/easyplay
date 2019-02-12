import React from 'react';
import dateFns from 'date-fns';
import './Calendar.css';

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  const dateFormat = 'MMMM YYYY';
  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div role="presentation" className="icon" onClick={prevMonth}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>{dateFns.format(currentMonth, dateFormat)}</span>
      </div>
      <div role="presentation" className="col col-end" onClick={nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
};
const CalendarDays = ({ currentMonth }) => {
  const dateFormat = 'dddd';
  const days = [];
  const startDate = dateFns.startOfWeek(currentMonth);

  for (let i = 0; i < 7; i += 1) {
    days.push(
      <div className="col col-center" key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
      </div>,
    );
  }

  return <div className="days row">{days}</div>;
};
const CalendarCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
  preferDates,
  unavailableDates,
}) => {
  const monthStart = dateFns.startOfMonth(currentMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const dateFormat = 'D';
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = '';
  let preferCount = 0;

  while (day <= endDate) {
    for (let i = 0; i < 7; i += 1) {
      formattedDate = dateFns.format(day, dateFormat);
      const cloneDay = day;
      const compositeDate = `${day.getFullYear()}-${(day.getMonth() + 1 < 10
        ? '0'
        : '')
        + (day.getMonth() + 1)}-${(day.getDate() < 10 ? '0' : '')
        + day.getDate()}`;

      preferCount = preferDates[compositeDate];

      days.push(
        <div
          role="presentation"
          className={`col cell ${
            // eslint-disable-next-line no-nested-ternary
            !dateFns.isSameMonth(day, monthStart)
              ? 'disabled'
              : dateFns.isSameDay(day, selectedDate)
                ? 'selected'
                : ''
          } 
        ${compositeDate in preferDates ? 'prefer' : ''}
          `}
          key={day}
          onClick={() => onDateClick(dateFns.parse(cloneDay))}
        >
          <div className="statistics">
            {preferCount ? '可以人數' : ''}
            {preferCount}
            {unavailableDates.indexOf(compositeDate) !== -1 ? (
              <span className="unavailableMark">（有人不行）</span>
            ) : (
              ''
            )}
          </div>
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
        </div>,
      );
      day = dateFns.addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>,
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

const NameFilter = ({ names, visibilityFilter, setVisibilityFilter }) => (
  <div className="nameFilter">
    <select
      value={visibilityFilter}
      onChange={e => setVisibilityFilter(e.target.value)}
    >
      <option value="ALL">顯示全部</option>
      {names.map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  </div>
);

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  componentDidMount = () => {
    const { onResult } = this.props;
    onResult();
  };

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.addMonths(currentMonth, 1),
    });
  };

  prevMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.subMonths(currentMonth, 1),
    });
  };

  render() {
    const {
      plandate,
      preferDates,
      unavailableDates,
      names,
      visibilityFilter,
      setVisibilityFilter,
    } = this.props;
    const { currentMonth, selectedDate } = this.state;
    return (
      <React.Fragment>
        <NameFilter
          names={names}
          visibilityFilter={visibilityFilter}
          setVisibilityFilter={setVisibilityFilter}
        />
        <div className="calendar">
          <CalendarHeader
            currentMonth={currentMonth}
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth}
          />
          <CalendarDays currentMonth={currentMonth} />
          <CalendarCells
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={this.onDateClick}
            preferDates={preferDates}
            unavailableDates={unavailableDates}
          />
        </div>
        {JSON.stringify(plandate)}
        <hr />
      </React.Fragment>
    );
  }
}

export default Calendar;
