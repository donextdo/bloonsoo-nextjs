import React, { Children } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const SharedDropDown = ({
    label,
    modelValue,
    updateModelValue,
    error,
    errorMessage,
    options,
    selectedOption,
    slot,
    children
  }:any) => {
    return ( 
        <div className="flex flex-col gap-2 items-start">
        {label && (
          <label className={`text-sm font-semibold ${error ? 'text-red-600' : 'text-gray-600'}`}>
            {label}
          </label>
        )}
  
        <div className="w-full h-max relative">
          <select
            id="dropdown"
            value={modelValue}
            onChange={(e) => updateModelValue(e.target.value)}
            className={error ? 'border-red-600' : 'border-slate-400 w-full px-6 py-2 border bg-white text-gray-600 text-sm font-semibold focus:outline-none appearance-none'}
          >
            {selectedOption && (
              <option
                value={selectedOption.value}
                className="text-sm font-semibold text-gray-500 appearance-none"
              >
                {selectedOption.label}
              </option>
            )}
  
            {options &&
              options.map((option:any, index:number) => (
                <option
                  key={index}
                  value={option.value ? option.value : option}
                  className="text-sm font-semibold text-gray-500 appearance-none"
                >
                  {option.label ? option.label : option}
                </option>
              ))}
  
            {slot && <div>
                {children}
                </div>}
          </select>
  
          <FontAwesomeIcon
            icon={faCaretDown}
            className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none"
          />
        </div>
  
        {error && <small className="text-xs text-red-600">{errorMessage}</small>}
      </div>
     );
}
 
export default SharedDropDown;