import React from 'react';

const NumberFieldGroup = ({ errors, name, label, type, onChange, value, min }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type="number" className="form-control" name={name} onChange={onChange} value={value} min={min} />
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

export default NumberFieldGroup;
