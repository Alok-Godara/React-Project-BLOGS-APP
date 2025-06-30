import React, { useId } from "react";

function CustomSelect({ options, label, className = '', ...props }, ref) {
  const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}
      <select {...props} id={id} ref={ref} placeholder='Select' className={`${className}`}>
        {options?.map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(CustomSelect);
