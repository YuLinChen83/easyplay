import reducer from './employee';

const initState = ['Tiffany', 'Sara', 'Tyler', 'Jack', 'Ben', 'Chole'];

describe('employeeReducer', () => {
  it('should return the initial state', () => {
    // 首先檢查使否正確建立初始state
    expect(JSON.stringify(reducer(undefined, {}))).toEqual(
      JSON.stringify(initState),
    );
  });
});
