import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectGroup =
  ({
     error,
     info,
     name,
     onChange,
     options,
     value
   }) => {
    const optionsToSelect = options.map(option => (
      <option key={option.label} value={option.value}>{option.label}</option>
    ));
    return (
      <div className="form-group">
        <select
          className={classnames('form-control form-control-lg', {'is-invalid': error})}
          name={name}
          onChange={onChange}
          value={value}>
          {optionsToSelect}
        </select>
        {info && <small className="form-text text-muted">{info}</small>}
        {error && (<div className="invalid-feedback">{error}</div>)}
      </div>
    )
  };

SelectGroup.propTypes = {
  error: PropTypes.string,
  info: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired
};

export default SelectGroup;
