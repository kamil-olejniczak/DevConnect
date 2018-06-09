import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputFieldGroup =
  ({
     autoComplete,
     disabled,
     error,
     info,
     name,
     onChange,
     placeholder,
     required,
     type,
     value
   }) => (
    <div className="form-group">
      <input autoComplete={autoComplete}
             className={classnames('form-control form-control-lg', {'is-invalid': error})}
             disabled={disabled}
             name={name}
             onChange={onChange}
             placeholder={placeholder}
             required={required}
             type={type}
             value={value}/>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  );

InputFieldGroup.propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  info: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

InputFieldGroup.propTypes = {
  type: 'text'
};

export default InputFieldGroup;
