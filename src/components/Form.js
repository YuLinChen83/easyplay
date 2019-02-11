import React from 'react'
import PropTypes from 'prop-types'

const Form = ({ names, onSubmit }) => (
  <div>
    123
    <select>
      {names.map(name => <option>{name}</option>)}
    </select>
    <label for="name">Ｎame</label><input name="name" type="text" />
    <label for="preferdate">PreferDate</label><input name="preferdate" type="text" />
    <label for="disabledate">DisableDate</label><input name="disabledate" type="text" />
    <button onClick={() => onSubmit()}>Submit</button>
  </div>
)


export default Form