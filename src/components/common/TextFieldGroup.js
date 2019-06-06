import React from 'react';

const TextFieldGroup = ({ errors, name, label, type, onChange, value }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} className="form-control" name={name} onChange={onChange} value={value} />
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

export default TextFieldGroup;
