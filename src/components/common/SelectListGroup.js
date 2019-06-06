import React from 'react';

const SelectListGroup = ({ label, onChange, value, name, errors, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <label>{label}</label>
      <select className="form-control" name={name} onChange={onChange} value={value}>
        <option value="" disabled>
          Select a {name}
        </option>
        {selectOptions}
      </select>
      {errors &&
        errors.length > 0 &&
        errors.map((error, i) => {
          return (
            error.param === name && (
              <p key={i} className="alert alert-danger">
                {error.msg}
              </p>
            )
          );
        })}
    </div>
  );
};

export default SelectListGroup;
