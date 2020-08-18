import React from 'react';
import PropTypes from "prop-types";


export const Input = ({value, name, onChange, className, placeholder = ''}) => (
      <div className="row">
        <div className="input-field col s12">
          <input
              value={value}
              name={name}
              type="text"
              className={className}
              onChange={(e) => onChange(e)}
              placeholder={placeholder}
          />
          <label className="active">{name}</label>
        </div>
      </div>
);

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

