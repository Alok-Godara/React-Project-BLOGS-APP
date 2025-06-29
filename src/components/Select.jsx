import React, { useId } from "react";

function Select({ options, label, className = '', ...props }, ref) {
  const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select {...props} id={id} ref={ref} className={`${className}`}>

      {options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}

      </select>
    </div>
  );
}

export default React.forwardRef(Select);
