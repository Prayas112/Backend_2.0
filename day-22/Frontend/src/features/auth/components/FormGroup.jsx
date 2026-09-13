import React from 'react'

const FormGroup = ({label, placeholder, value, onchange}) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
      value={value}
      onChange={onchange} type="text" name={label} placeholder={placeholder} />
    </div>
  )
}

export default FormGroup
