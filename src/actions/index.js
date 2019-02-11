export const inputDate = () => ({
  type: 'INPUT_DATE',
});

export const onFormChange = formData => ({
  type: 'ON_FORM_CHANGE',
  formData,
});

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const resultData = () => ({
  type: 'RESULT_DATA',
});
