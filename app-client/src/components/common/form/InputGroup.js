import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup =
  ({
     autoComplete,
     error,
     icon,
     name,
     onChange,
     placeholder,
     type,
     value
   }) => (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon}/>
        </span>
      </div>
      <input autoComplete={autoComplete} //TODO: Should use InputFieldGroup?
             className={classnames('form-control form-control-lg', {'is-invalid': error})}
             name={name}
             onChange={onChange}
             placeholder={placeholder}
             type={type}
             value={value}/>
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  );

InputGroup.propTypes = {
  autoComplete: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

InputGroup.defaultProps = {
  autoComplete: 'off',
  type: 'text'
};

export default InputGroup;
